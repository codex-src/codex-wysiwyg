import * as iter from "./iter"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"
import { concatenateVDOMSpans } from "./spans"
import { newVDOMCursor } from "./cursors"

// Reads an array of spans.
function readSpans(spans) {
	let content = ""
	for (const span of spans) {
		content += span.content
	}
	return content
}

// Counts the number of bytes between state.cursors.
function countBytesBetweenCursors(state) {

	// const x1 = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
	// const x2 = state.elements.findIndex(each => each.uuid === state.cursors[1].uuid)

	let x1 = -1
	let x2 = -1
	for (let x = 0; x < state.elements.length; x++) {
		if (state.elements[x].uuid === state.cursors[0].uuid) {
			x1 = x
		}
		if (state.elements[x].uuid === state.cursors[1].uuid) {
			x2 = x
		}
		if (x1 !== -1 && x2 !== -1) {
			// No-op
			break
		}
	}
	let count = state.cursors[1].offset - state.cursors[0].offset
	for (let x = x1; x !== x2; x++) {
		count += readSpans(state.elements[x].spans).length
	}
	return count
}

const methods = state => ({
	/*
	 * Cursors
	 */
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(cursors) {
		Object.assign(state.cursors, {
			...cursors,
			collapsed: cursors[0] === cursors[1],
		})
	},
	// Collapses the start and end cursors.
	collapse() {
		Object.assign(state.cursors, {
			...[state.cursors[0], state.cursors[0]],
			collapsed: true,
		})
	},
	/*
	 * Backspace
	 */
	// Counts the RTL number of bytes to a boundary.
	countBytesToBoundaryRTL(state, boundaryFn) {
		if (!state.cursors.collapsed) {
			return countBytesBetweenCursors(state)
		}
		const x = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
		const content = readSpans(state.elements[x].spans)
		let count = boundaryFn(content, state.cursors[0].offset)
		if (!count && x) {
			count++
		}
		return count
	},
	// Counts the LTR number of bytes to a boundary.
	countBytesToBoundaryLTR(state, boundaryFn) {
		if (!state.cursors.collapsed) {
			return countBytesBetweenCursors(state)
		}
		const x = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
		const content = readSpans(state.elements[x].spans)
		let count = boundaryFn(content, state.cursors[0].offset)
		if (!count && x + 1 < state.elements.length) {
			count++
		}
		return count
	},
	// Removes a number of bytes from the current cursors.
	removeByteCount(count) {
		// NOTE: Uses state.cursors[1] because of the
		// !state.cursors.collapsed case.
		const uuidElement = state.elements.find(each => each.uuid === state.cursors[1].uuid)
		let characterOffset = state.cursors[1].offset

		let spanOffset = 0
		for (; spanOffset < uuidElement.spans.length; spanOffset++) {
			const content = uuidElement.spans[spanOffset].content
			if (characterOffset - content.length <= 0) {
				// No-op
				break
			}
			characterOffset -= content.length
		}

		// Removes a number of bytes from a span at an characterOffset.
		const removeByteCountFromSpan = (uuidElement, spanOffset, characterOffset, count) => {
			if (count > characterOffset) {
				count = characterOffset
			}
			uuidElement.spans[spanOffset].content = (
				uuidElement.spans[spanOffset].content.slice(0, characterOffset - count) +
				uuidElement.spans[spanOffset].content.slice(characterOffset)
			)
			if (!uuidElement.spans[spanOffset].content) {
				uuidElement.spans.splice(spanOffset, 1)
			}
			return count
		}

		const decremented = count
		while (count) {
			count -= removeByteCountFromSpan(uuidElement, spanOffset, characterOffset, count)
			if (spanOffset - 1 >= 0) {
				characterOffset = uuidElement.spans[spanOffset - 1].content.length
				spanOffset--
			}
		}

		// TODO: We need to merge *many* uuidElement.spans
		concatenateVDOMSpans(uuidElement.spans)

		if (state.cursors.collapsed) {
			state.cursors[0].offset -= decremented
		}
		this.collapse()

	},
	backspaceRune() {
		const countL = this.countBytesToBoundaryRTL(state, iter.rtl.rune)
		this.removeByteCount(countL, 0)
	},
	backspaceWord() {
		const countL = this.countBytesToBoundaryRTL(state, iter.rtl.word)
		this.removeByteCount(countL, 0)
	},
	backspaceParagraph() {
		const countL = this.countBytesToBoundaryRTL(state, iter.rtl.line)
		this.removeByteCount(countL, 0)
	},
	forwardBackspaceRune() {
		// const countR = this.countBytesToBoundaryLTR(state, iter.ltr.rune)
		// this.removeByteCount(0, countR)
	},
	forwardBackspaceWord() {
		// const countR = this.countBytesToBoundaryLTR(state, iter.ltr.word)
		// this.removeByteCount(0, countR)
	},
	/*
	 * Input
	 */
	write(characterData) {
		// TODO
	},
	input(uuid, spans, cursor) {
		const uuidElement = state.elements.find(each => each.uuid === uuid)
		if (!uuidElement.spans.length) {
			uuidElement.uuid = uuidv4()
			cursor.uuid = uuidElement.uuid
		}
		uuidElement.spans = spans
		this.select([cursor, cursor])
	},
})

function init(initialState) {
	const state = {
		focused: false,
		cursors: {
			0: newVDOMCursor(),
			1: newVDOMCursor(),
			collapsed: true,
		},
		// TODO: Rename elements to uuidElements?
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
