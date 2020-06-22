import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import newShortUUID from "lib/newShortUUID"
import React from "react"
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

// Computes the uncollapsed byte count.
function computeUncollapsedByteCount(state) {
	let byteCount = state.cursors[1].offset - state.cursors[0].offset
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
		byteCount += x1 >= 0
	}
	for (let x = x1; x !== x2; x++) {
		byteCount += Spans.textContent(state.elements[x].props.children).length
	}
	// // NOTE: Uses x2 for x; e.g. RTL.
	// return { x: x2, byteCount}
	return { elemOffset: x1, byteCount}
}

// Computes the collapsed byte count (RTL).
function computeCollapsedByteCountRTL(state, rtlIter) {
	let byteCount = 0
	const x = state.elements.findIndex(each => each.key === state.cursors[0].key)
	const textContent = Spans.textContent(state.elements[x].props.children)
	byteCount += rtlIter(textContent.slice(0, state.cursors[0].offset)).length
	if (!byteCount && x) { // FIXME: Add support for nodes
		byteCount++
	}
	return { elemOffset: x, byteCount }
}

// Computes the collapsed byte count (LTR).
function computeCollapsedByteCountLTR(state, ltrIter) {
	let byteCount = 0
	const x = state.elements.findIndex(each => each.key === state.cursors[0].key)
	const textContent = Spans.textContent(state.elements[x].props.children)
	byteCount += ltrIter(textContent.slice(state.cursors[0].offset)).length
	if (!byteCount && x + 1 < state.elements.length) { // FIXME: Add support for nodes
		byteCount++
	}
	return { elemOffset: x, byteCount }
}

// Compute the right-to-left (RTL) or left-to-right (LTR)
// byte count for collapsed and uncollapsed states.
function computeByteCount(state, anyIter) {
	let dir = ""
	switch (anyIter) {
	case Iterators.rtl.rune:
	case Iterators.rtl.word:
	case Iterators.rtl.line:
		dir = "rtl"
		break
	case Iterators.ltr.rune:
	case Iterators.ltr.word:
		dir = "ltr"
		break
	default:
		// No-op
		break
	}
	let payload = null
	if (state.cursors.collapsed) {
		const computeCollapsedByteCount = dir === "rtl" ? computeCollapsedByteCountRTL :
			computeCollapsedByteCountLTR
		payload = computeCollapsedByteCount(state, anyIter)
	} else {
		payload = computeUncollapsedByteCount(state)
	}
	return payload
}

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
	// collapse() {
	// 	const collapsed = Cursors.collapse(state.cursors)
	// 	this.select(collapsed)
	// },
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
			const forcedKey = newShortUUID()
			element.key = forcedKey
			collapsed[0].key = forcedKey // Updates collapsed[1].key because references are shared
		}
		state.elements.splice(x, 1, element)
		this.select(collapsed)
	},
	dropByteCount(payload, dir) {
		// console.log(payload, { dir })

		let { elemOffset, byteCount } = payload
		if (dir === "rtl") {

			// Computes the span and character offsets from a
			// cursor offset.
			const computeSpanOffsets = (spans, offset) => {
				let spanOffset = 0      // Span offset
				let charOffset = offset // Character offset of the span offset
				for (; spanOffset < spans.length; spanOffset++) {
					const textContent = spans[spanOffset].props.children
					if (charOffset - textContent.length <= 0) {
						// No-op
						break
					}
					charOffset -= textContent.length
				}
				return [spanOffset, charOffset]
			}

			// const spans = state.elements[elemOffset].props.children
			// let [spanOffset, charOffset] = computeSpanOffsets(spans, state.cursors[0].offset)
			// spans[spanOffset].props.children = ""
			// // console.log(JSON.parse(JSON.stringify(spans)))
			// if (!spans[spanOffset].props.children) {
			// 	spans.splice(spanOffset, 1)
			// }
			// console.log(JSON.parse(JSON.stringify(spans)))
			// Spans.defer(spans)
			// state.cursors[0].offset--
			// const collapsed = Cursors.collapse(state.cursors)
			// this.select(collapsed)

			// TODO: Add support for nodes
			while (byteCount) {
				const spans = state.elements[elemOffset].props.children
				const [spanOffset, charOffset] = computeSpanOffsets(spans, state.cursors[0].offset)
				const bytes = Math.min(byteCount, charOffset)
				spans[spanOffset].props.children = (
					spans[spanOffset].props.children.slice(0, charOffset - bytes) +
					spans[spanOffset].props.children.slice(charOffset)
				)
				if (!spans[spanOffset].props.children) {
					spans.splice(spanOffset, 1)
				}
				// TODO: Decrement elemOffset here
				Spans.defer(spans)
				byteCount -= bytes
				state.cursors[0].offset -= bytes
			}
			const collapsed = Cursors.collapse(state.cursors)
			this.select(collapsed)

			// // Removes a number of bytes from a span at an offset.
			// const removeByteCountFromSpan = (uuidElement, x, offset, count) => {
			// 	if (count > offset) {
			// 		count = offset
			// 	}
			// 	if (typeof uuidElement.spans[x] === "string") {
			// 		uuidElement.spans[x] = (
			// 			uuidElement.spans[x].slice(0, offset - count) +
			// 			uuidElement.spans[x].slice(offset)
			// 		)
			// 		if (!uuidElement.spans[x]) {
			// 			uuidElement.spans.splice(x, 1)
			// 		}
			// 	} else {
			// 		uuidElement.spans[x].content = (
			// 			uuidElement.spans[x].content.slice(0, offset - count) +
			// 			uuidElement.spans[x].content.slice(offset)
			// 		)
			// 		if (!uuidElement.spans[x].content) {
			// 			uuidElement.spans.splice(x, 1)
			// 		}
			// 	}
			// 	return count
			// }


			// 1. get the span offset and character offsets (we
			// already have the element offset -- we don’t need to
			// recompute this on every pass)
			// 2. from the span offset, we can try to drop the max
			// number of bytes; returns the max number of bytes
			// dropped (splice or equivalent empty spans)
			// 3. repeat (dropCount > 0)

			// while (byteCount) {
			// 	// ...
			// }
		} else if (dir === "ltr") {
			// while (byteCount) {
			// 	// ...
			// }
		}

		// // Get the current UUID element:
		// let { uuid, offset } = state.cursors[0]
		// const uuidElement = state.elements.find(each => each.uuid === uuid)
		// // Get the span (x) and character offset (offset):
		// let x = 0
		// for (; x < uuidElement.spans.length; x++) {
		// 	const content = readSyntheticSpan(uuidElement.spans[x])
		// 	if (offset - content.length <= 0) {
		// 		// No-op
		// 		break
		// 	}
		// 	offset -= content.length
		// }
		// // Removes a number of bytes from a span at an offset.
		// const removeByteCountFromSpan = (uuidElement, x, offset, count) => {
		// 	if (count > offset) {
		// 		count = offset
		// 	}
		// 	if (typeof uuidElement.spans[x] === "string") {
		// 		uuidElement.spans[x] = (
		// 			uuidElement.spans[x].slice(0, offset - count) +
		// 			uuidElement.spans[x].slice(offset)
		// 		)
		// 		if (!uuidElement.spans[x]) {
		// 			uuidElement.spans.splice(x, 1)
		// 		}
		// 	} else {
		// 		uuidElement.spans[x].content = (
		// 			uuidElement.spans[x].content.slice(0, offset - count) +
		// 			uuidElement.spans[x].content.slice(offset)
		// 		)
		// 		if (!uuidElement.spans[x].content) {
		// 			uuidElement.spans.splice(x, 1)
		// 		}
		// 	}
		// 	return count
		// }

	},
	backspaceRTLRune() {
		const payload = computeByteCount(state, Iterators.rtl.rune)
		this.dropByteCount(payload, "rtl")
	},
	backspaceRTLWord() {
		const payload = computeByteCount(state, Iterators.rtl.word)
		this.dropByteCount(payload, "rtl")
	},
	backspaceRTLLine() {
		const payload = computeByteCount(state, Iterators.rtl.line)
		this.dropByteCount(payload, "rtl")
	},
	backspaceLTRRune() {
		const payload = computeByteCount(state, Iterators.ltr.rune)
		this.dropByteCount(payload, "ltr")
	},
	backspaceLTRWord() {
		const payload = computeByteCount(state, Iterators.ltr.word)
		this.dropByteCount(payload, "ltr")
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
