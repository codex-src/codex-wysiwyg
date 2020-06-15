import * as iter from "./iter"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"
import { mergeRedundantSpans } from "./spans"
import { newCursor } from "./cursors"

// Counts the number of bytes between the cursors.
function countBytesBetweenCursors(state) {
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
	while (x1 !== x2) {
		count += readSyntheticUUIDElement(state.element[x1])
	}
	return count
}

// Reads a synthetic UUID element.
function readSyntheticUUIDElement(uuidElement) {
	const reducer = (acc, each) => {
		if (typeof each === "string") {
			return acc + each
		}
		return acc + each.content
	}
	return uuidElement.spans.reduce(reducer, "")
}

// Reads a synthetic span.
function readSyntheticSpan(span) {
	if (typeof span === "string") {
		return span
	}
	return span.content
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
	// Counts the number of bytes to a boundary.
	countBytesToBoundary(state, iterator) {
		const dir = new Map(Object.entries({
			[iter.rtl.rune]: "rtl",
			[iter.rtl.word]: "rtl",
			[iter.rtl.line]: "rtl",
			[iter.ltr.rune]: "ltr",
			[iter.ltr.word]: "ltr",
		}))[iterator]
		if (!state.cursors.collapsed) {
			return countBytesBetweenCursors(state)
		}
		const { uuid, offset } = state.cursors[0]
		const x = state.elements.findIndex(each => each.uuid === uuid)
		let count = iterator(readSyntheticUUIDElement(state.elements[x]), offset)
		if (!count && ((dir === "rtl" && x) || (dir === "ltr" && x + 1 < state.elements.length))) {
			count++
		}
		return count
	},
	// Removes a number of bytes (countL and countR).
	removeByteCounts(countL, countR) {
		// NOTE: Uses state.cursors[1] because of
		// !state.cursors.collapsed case.
		const uuidElement = state.elements.find(each => each.uuid === state.cursors[1].uuid)
		let offset = state.cursors[1].offset

		// Get the span (x) and character offset (offset):
		let x = 0
		for (; x < uuidElement.spans.length; x++) {
			const content = readSyntheticSpan(uuidElement.spans[x])
			if (offset - content.length <= 0) {
				// No-op
				break
			}
			offset -= content.length
		}

		// Removes a number of bytes from a span at an offset.
		const removeByteCountFromSpan = (uuidElement, x, offset, count) => {
			if (count > offset) {
				count = offset
			}
			uuidElement.spans[x].content = (
				uuidElement.spans[x].content.slice(0, offset - count) +
				uuidElement.spans[x].content.slice(offset)
			)
			if (!uuidElement.spans[x].content) {
				uuidElement.spans.splice(x, 1)
			}
			return count
		}

		const decremented = countL
		while (countL) {
			countL -= removeByteCountFromSpan(uuidElement, x, offset, countL)
			if (x - 1 >= 0) {
				offset = uuidElement.spans[x - 1].content.length
				x--
			}
		}

		mergeRedundantSpans(uuidElement.spans)

		if (state.cursors.collapsed) {
			state.cursors[0].offset -= decremented
		}
		this.collapse()

	},
	backspaceRune() {
		const count = this.countBytesToBoundary(state, iter.rtl.rune)
		this.removeByteCounts(count, 0)
	},
	backspaceWord() {
		const count = this.countBytesToBoundary(state, iter.rtl.word)
		this.removeByteCounts(count, 0)
	},
	backspaceParagraph() {
		const count = this.countBytesToBoundary(state, iter.rtl.line)
		this.removeByteCounts(count, 0)
	},
	forwardBackspaceRune() {
		const count = this.countBytesToBoundary(state, iter.ltr.rune)
		this.removeByteCounts(0, count)
	},
	forwardBackspaceWord() {
		const count = this.countBytesToBoundary(state, iter.ltr.word)
		this.removeByteCounts(0, count)
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
			0: newCursor(),
			1: newCursor(),
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
