import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import React from "react"
import shortUUID from "lib/shortUUID"
import useMethods from "use-methods"

// // Computes offsets based on a cursor.
// //
// // TODO: Extract offsets module?
// function computeOffsets(elements, { key, offset }) {
// 	const elemOffset = elements.findIndex(each => each.key === key)
// 	if (elemOffset === -1) {
// 		throw new Error("computeOffsets: FIXME")
// 	}
// 	// TODO: Add support for non-standard types here?
// 	const nodeOffset = 0
// 	// Shorthand:
// 	const spans = elements[elemOffset].props.children
// 	let spanOffset = 0
// 	let charOffset = offset
// 	for (; spanOffset < spans.length; spanOffset++) {
// 		if (charOffset - spans[spanOffset].props.children.length <= 0) {
// 			// No-op
// 			break
// 		}
// 		charOffset -= spans[spanOffset].props.children.length
// 	}
// 	return [elemOffset, nodeOffset, spanOffset, charOffset]
// }
//
// // Computes a set of RTL offsets.
// //
// // TODO: Extract offsets module?
// function computeRTLOffsetsSet(elements, cursors, rtlIterator) {
// 	let offsets1 = computeOffsets(elements, cursors[0]) // TODO: Do not autocompute?
// 	const offsets2 = computeOffsets(elements, cursors[1])
// 	if (cursors.collapsed) {
// 		// Backspace on text:
// 		if (!(offsets1[0] && !offsets1[1] && !offsets1[2] && !offsets1[3])) {
// 			const substr = Spans.textContent(elements[offsets1[0]].props.children).slice(0, cursors[0].offset)
// 			offsets1 = computeOffsets(elements, {
// 				...cursors[0],
// 				offset: cursors[0].offset - rtlIterator(substr).length,
// 			})
// 		// Backspace on "\n":
// 		} else {
// 			offsets1 = computeOffsets(elements, {
// 				key: elements[offsets1[0] - 1].key,
// 				offset: Spans.textContent(elements[offsets1[0] - 1].props.children).length,
// 			})
// 		}
// 	}
// 	return [offsets1, offsets2]
// }
//
// // Computes a set of LTR offsets.
// function computeLTROffsetsSet(elements, cursors, ltrIterator) {
// 	const offsets1 = computeOffsets(elements, cursors[0]) // TODO: Do not autocompute?
// 	let offsets2 = computeOffsets(elements, cursors[1])
// 	if (cursors.collapsed) {
// 		// NOTE: Uses offsets2 and cursors[1] not offsets1 and
// 		// cursors[0].
// 		const substr = Spans.textContent(elements[offsets2[0]].props.children).slice(cursors[1].offset)
// 		offsets2 = computeOffsets(elements, {
// 			...cursors[1],
// 			offset: cursors[1].offset + ltrIterator(substr).length,
// 		})
// 	}
// 	return [offsets1, offsets2]
// }

// // Reads text content from a UUID element.
// function readTextContent(uuidElement) {
// 	let textContent = ""
// 	for (const span of uuidElement.spans) {
// 		textContent += span.textContent
// 	}
// 	return textContent
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

// Computes the uncollapsed byte count (both RTL and LTR).
function computeUncollapsedByteCount(state) {
	let count = state.cursors[1].offset - state.cursors[0].offset

	let x1 = -1
	let x2 = -1
	for (let x = 0; x < state.elements.length; x++) {
		if (state.elements[x].key === state.cursors[0].key) {
			x1 = x
		}
		if (state.elements[x].key === state.cursors[1].key) {
			x2 = x
		}
		if (x1 !== -1 && x2 !== -1) {
			// No-op
			break
		}
		// Increment paragraphs:
		count += x1 >= 0
	}
	for (let x = x1; x !== x2; x++) {
		count += Spans.textContent(state.elements[x].props.children).length
	}
	return count
}

// Computes the collapsed (RTL) byte count.
function computeCollapsedRTLByteCount(state, rtlIterator) {
	let count = 0

	const x = state.elements.findIndex(each => each.key === state.cursors[0].key)
	const textContent = Spans.textContent(state.elements[x].props.children)
	count += rtlIterator(textContent.slice(0, state.cursors[0].offset)).length
	if (!count && x) {
		count++
	}
	return count
}

// Compute the byte count (RTL) for collapsed and
// uncollapsed cursors states.
function computeRTLByteCount(state, rtlIterator) {
	let count = 0
	if (state.cursors.collapsed) {
		count += computeCollapsedRTLByteCount(state, rtlIterator)
	} else {
		count += computeUncollapsedByteCount(state)
	}
	console.log(count)
}

// // Compute the byte count (RTL) for collapsed and
// // uncollapsed cursors states.
// function computeRTLByteCount(state, rtlIterator) {
// 	let count = 0
// 	if (state.cursors.collapsed) {
// 		count += computeCollapsedRTLByteCount(state, rtlIterator)
// 	} else {
// 		count += computeUncollapsedByteCount(state)
// 	}
// 	console.log(count)
// }

const methods = state => ({
	/*
	 * Focus
	 */
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	/*
	 * Cursors
	 */
	select(cursors) {
		state.cursors = cursors
	},
	collapse() {
		const collapsed = Cursors.collapse(state.cursors)
		this.select(collapsed)
	},
	/*
	 * Input
	 */
	input(element, collapsed) {
		const x = state.elements.findIndex(each => each.key === collapsed[0].key)
		if (x === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		// Force a new key for <br> to text node:
		if (!state.elements[x].props.children.length) {
			const forcedKey = shortUUID()
			element.key = forcedKey
			collapsed[0].key = forcedKey // Updates collapsed[1].key because references are shared
		}
		state.elements.splice(x, 1, element)
		this.select(collapsed)
	},
	dropByteCount() {
		// ...
	},
	backspaceRTLRune() {
		const byteCount = computeRTLByteCount(state, Iterators.rtl.rune)
		this.dropByteCount(byteCount, 0)
	},
	backspaceRTLWord() {
		const byteCount = computeRTLByteCount(state, Iterators.rtl.word)
		this.dropByteCount(byteCount, 0)
	},
	backspaceRTLLine() {
		const byteCount = computeRTLByteCount(state, Iterators.rtl.line)
		this.dropByteCount(byteCount, 0)
	},
	backspaceLTRRune() {
		// console.log(computeLTROffsetsSet(state.elements, state.cursors, Iterators.ltr.rune))
	},
	backspaceLTRWord() {
		// console.log(computeLTROffsetsSet(state.elements, state.cursors, Iterators.ltr.word))
	},
})

function init(elements) {
	const state = {
		focused: false,
		cursors: {
			0: Cursors.construct(),
			1: Cursors.construct(),
			collapsed: true,
		},
		elements,
	}
	return state
}

function useEditor(children) {
	const elements = React.useMemo(() => {
		return Elements.parseFromReactElements(children)
	}, [children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
