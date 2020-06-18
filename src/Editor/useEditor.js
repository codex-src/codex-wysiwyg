import * as iter from "./iter"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"
import { concatenateVDOMSpans } from "./spans"
import { newVDOMCursor } from "./cursors"

// // Reads text content from a UUID element.
// function readTextContent(uuidElement) {
// 	let textContent = ""
// 	for (const span of uuidElement.spans) {
// 		textContent += span.textContent
// 	}
// 	return textContent
// }
//
// // Counts the number of bytes between state.cursors.
// function countBytesBetweenCursors(state) {
// 	let count = state.cursors[1].offset - state.cursors[0].offset
// 	if (state.cursors.collapsed) {
// 		return count
// 	}
// 	let x1 = -1
// 	let x2 = -1
// 	for (let x = 0; x < state.elements.length; x++) {
// 		if (state.elements[x].uuid === state.cursors[0].uuid) {
// 			x1 = x
// 		}
// 		if (state.elements[x].uuid === state.cursors[1].uuid) {
// 			x2 = x
// 		}
// 		if (x1 !== -1 && x2 !== -1) {
// 			// No-op
// 			break
// 		}
// 		// Increment paragraphs:
// 		count += x1 >= 0
// 	}
// 	for (let x = x1; x !== x2; x++) {
// 		count += readTextContent(state.elements[x]).length
// 	}
// 	return count
// }
//
// // Counts the number of bytes from state.cursors[0] to a
// // boundary (boundaryFn).
// function countBytesToBoundary(state, boundaryFn) {
// 	let dir = ""
// 	switch (boundaryFn) {
// 	case iter.rtl.rune:
// 	case iter.rtl.word:
// 	case iter.rtl.line:
// 		dir = "rtl"
// 		break
// 	case iter.ltr.rune:
// 	case iter.ltr.word:
// 		dir = "ltr"
// 		break
// 	default:
// 		// No-op
// 		break
// 	}
// 	const x = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
// 	const textContent = readTextContent(state.elements[x])
// 	let count = boundaryFn(textContent.slice(0, state.cursors[0].offset)).length
// 	if (!count && dir === "rtl" && x) {
// 		count++
// 	} else if (!count && dir === "ltr" && x + 1 < state.elements.length) {
// 		count++
// 	}
// 	return count
// }

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
	removeByteCount(countL, countR) { // TODO: Add cursors as a parameter?

		// // offsets for a VDOM cursor.
		// const computeOffsets = ({ uuid, offset }) => {
		// 	// UUID element offset (constant):
		// 	const uuidElementOffset = state.elements.findIndex(each => each.uuid === uuid)
		// 	// Compute span and character offset of a UUID
		// 	// element:
		// 	let spanOffset = 0
		// 	let characterOffset = offset
		// 	for (; spanOffset < state.elements[uuidElementOffset].spans.length; spanOffset++) {
		// 		const span = state.elements[uuidElementOffset].spans[spanOffset]
		// 		if (characterOffset - span.textContent.length <= 0) {
		// 			// No-op
		// 			break
		// 		}
		// 		characterOffset -= span.textContent.length
		// 	}
		// 	return [uuidElementOffset, spanOffset, characterOffset]
		// }

		// const offsetsA = computeOffsets(state.cursors[1])

		// while (countL) {
		// 	cursor = state.cursors[1]
		// 	// countL -= ...
		// }

		// while (countR) {
		// 	cursor = state.cursors[0]
		// 	// countR -= ...
		// }
	},

	dropRange(state) {
		// compute offsets
		// ...
	},
	dropBoundary(state, boundaryFn) {
		// compute number of bytes
		//
		// const uuidElementOffset = state.elements.findIndex(each => each.uuid === state.cursors[0].uuid)
		// let textContent = ""
		// if (uuidElementOffset - 1 >= 0) {
		// 	textContent += (
		// 		state.elements[uuidElementOffset - 1].textContent +
		// 		"\n"
		// 	)
		// }
		// textContent += state.elements[uuidElementOffset].textContent.slice(0, state.cursors[0].offset)
		// console.log({ content: boundaryFn(textContent) })
	},

	backspaceRune() {
		if (!state.cursors.collapsed) {
			this.dropRange(state)
			return
		}
		this.dropBoundary(state, iter.rtl.rune)

		// let count = 0
		// if (state.cursors.collapsed) {
		// 	count = countBytesToBoundary(state, iter.rtl.rune)
		// } else {
		// 	count = countBytesBetweenCursors(state)
		// }
		// this.removeByteCount(count, 0)
	},
	backspaceWord() {
	// 	let count = 0
	// 	if (state.cursors.collapsed) {
	// 		count = countBytesToBoundary(state, iter.rtl.word)
	// 	} else {
	// 		count = countBytesBetweenCursors(state)
	// 	}
	// 	this.removeByteCount(count, 0)
	},
	backspaceParagraph() {
	// 	let count = 0
	// 	if (state.cursors.collapsed) {
	// 		count = countBytesToBoundary(state, iter.rtl.line)
	// 	} else {
	// 		count = countBytesBetweenCursors(state)
	// 	}
	// 	this.removeByteCount(count, 0)
	},
	forwardBackspaceRune() {
	// 	let count = 0
	// 	if (state.cursors.collapsed) {
	// 		count = countBytesToBoundary(state, iter.ltr.rune)
	// 	} else {
	// 		count = countBytesBetweenCursors(state)
	// 	}
	// 	this.removeByteCount(0, count)
	},
	forwardBackspaceWord() {
	// 	let count = 0
	// 	if (state.cursors.collapsed) {
	// 		count = countBytesToBoundary(state, iter.ltr.word)
	// 	} else {
	// 		count = countBytesBetweenCursors(state)
	// 	}
	// 	this.removeByteCount(0, count)
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
		// uuidElement.textContent = uuidElement.spans.map(each => each.textContent).join("")
		uuidElement.textContent = uuidElement.spans.reduce((acc, each) => acc + each.textContent, "")
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
