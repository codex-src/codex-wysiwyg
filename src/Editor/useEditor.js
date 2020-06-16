import * as iter from "./iter"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"
import { concatenateVDOMSpans } from "./spans"
import { newVDOMCursor } from "./cursors"

// Reads text content from an array of VDOM spans.
function readTextContent(spans) {
	let textContent = ""
	for (const span of spans) {
		textContent += span.textContent
	}
	return textContent
}

// Counts the number of bytes between state.cursors.
//
// TODO: Extract
function countBytesBetweenCursors(state) {
	let count = state.cursors[1].offset - state.cursors[0].offset
	if (state.cursors.collapsed) {
		return count
	}
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
	for (let x = x1; x !== x2; x++) {
		count += readTextContent(state.elements[x].spans).length
	}
	return count
}

// Counts the number of bytes from state.cursors[0] to a
// boundary (boundaryFn).
//
// TODO: Extract
function countBytesToBoundary(state, boundaryFn) {
	let dir = ""
	switch (boundaryFn) {
	case iter.rtl.rune:
	case iter.rtl.word:
	case iter.rtl.line:
		dir = "rtl"
		break
	case iter.ltr.rune:
	case iter.ltr.word:
		dir = "ltr"
		break
	default:
		// No-op
		break
	}
	const x = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
	const textContent = readTextContent(state.elements[x].spans)
	let count = boundaryFn(textContent.slice(0, state.cursors[0].offset)).length
	if (!count && dir === "rtl" && x) {
		count++
	} else if (!count && dir === "ltr" && x + 1 < state.elements.length) {
		count++
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
	// Removes a number of bytes from the current cursors.
	removeByteCount(count) { // TODO: Add cursors as a parameter?

		// // NOTE: Uses state.cursors[1] because of the
		// // !state.cursors.collapsed case.
		// const uuidElement = state.elements.find(each => each.uuid === state.cursors[1].uuid)
		// let characterOffset = state.cursors[1].offset
		//
		// let spanOffset = 0
		// for (; spanOffset < uuidElement.spans.length; spanOffset++) {
		// 	const textContent = uuidElement.spans[spanOffset].textContent
		// 	if (characterOffset - textContent.length <= 0) {
		// 		// No-op
		// 		break
		// 	}
		// 	characterOffset -= textContent.length
		// }
		//
		// // Removes a number of bytes from a span at an characterOffset.
		// const removeByteCountFromSpan = (uuidElement, spanOffset, characterOffset, count) => {
		// 	if (count > characterOffset) {
		// 		count = characterOffset
		// 	}
		// 	uuidElement.spans[spanOffset].textContent = (
		// 		uuidElement.spans[spanOffset].textContent.slice(0, characterOffset - count) +
		// 		uuidElement.spans[spanOffset].textContent.slice(characterOffset)
		// 	)
		// 	if (!uuidElement.spans[spanOffset].textContent) {
		// 		uuidElement.spans.splice(spanOffset, 1)
		// 	}
		// 	return count
		// }
		//
		// const decremented = count
		// while (count) {
		// 	count -= removeByteCountFromSpan(uuidElement, spanOffset, characterOffset, count)
		// 	if (spanOffset - 1 >= 0) {
		// 		characterOffset = uuidElement.spans[spanOffset - 1].textContent.length
		// 		spanOffset--
		// 	}
		// }
		//
		// // TODO: We need to merge *many* uuidElement.spans
		// concatenateVDOMSpans(uuidElement.spans)
		//
		// if (state.cursors.collapsed) {
		// 	state.cursors[0].offset -= decremented
		// }
		// this.collapse()

	},
	// \n<backspace-line>\] not working
	backspaceRune() {
		let count = 0
		if (state.cursors.collapsed) {
			count = countBytesToBoundary(state, iter.rtl.rune)
		} else {
			count = countBytesBetweenCursors(state)
		}
		this.removeByteCount(count, 0)
	},
	backspaceWord() {
		let count = 0
		if (state.cursors.collapsed) {
			count = countBytesToBoundary(state, iter.rtl.word)
		} else {
			count = countBytesBetweenCursors(state)
		}
		this.removeByteCount(count, 0)
	},
	backspaceParagraph() {
		let count = 0
		if (state.cursors.collapsed) {
			count = countBytesToBoundary(state, iter.rtl.line)
		} else {
			count = countBytesBetweenCursors(state)
		}
		this.removeByteCount(count, 0)
	},
	forwardBackspaceRune() {
		let count = 0
		if (state.cursors.collapsed) {
			count = countBytesToBoundary(state, iter.ltr.rune)
		} else {
			count = countBytesBetweenCursors(state)
		}
		this.removeByteCount(0, count)
	},
	forwardBackspaceWord() {
		let count = 0
		if (state.cursors.collapsed) {
			count = countBytesToBoundary(state, iter.ltr.word)
		} else {
			count = countBytesBetweenCursors(state)
		}
		this.removeByteCount(0, count)
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
