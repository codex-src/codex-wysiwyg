import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import newShortUUID from "lib/newShortUUID"
import React from "react"
import useMethods from "use-methods"

// Computes x- and y-offsets and the byte count for
// collapsed cursors (RTL).
function computeCollapsedByteCountRTL(elements, cursors, rtlIterator) {
	const { key, offset: x } = cursors[0]

	const y = elements.findIndex(each => each.key === key)
	const substr = Spans.textContent(elements[y].props.children).slice(0, x)
	let nbytes = rtlIterator(substr).length
	if (!nbytes && y) {
		nbytes++
	}
	return [y, x, nbytes]
}

// Computes reversed x- and y-offsets and the byte count for
// collapsed cursors (LTR).
function computeCollapsedByteCountLTR(elements, cursors, ltrIterator) {
	let { key, offset: x } = cursors[0]

	let y = elements.findIndex(each => each.key === key)
	const substr = Spans.textContent(elements[y].props.children).slice(x)
	let nbytes = ltrIterator(substr).length
	if (!nbytes && y + 1 < elements.length) {
		y++
		x = 0
		nbytes++
	} else {
		x += nbytes
	}
	return [y, x, nbytes]
}

// Computes reversed x- and y-offsets and the byte count for
// uncollapsed cursors.
function computeUncollapsedByteCount(elements, cursors) {
	let y = 0
	let x = 0
	let nbytes = cursors[1].offset - cursors[0].offset
	all: for (; y < elements.length; y++) {
		if (elements[y].key === cursors[0].key) {
			for (; y < elements.length; y++) {
				if (elements[y].key === cursors[1].key) {
					x = cursors[1].offset
					break all
				}
				const textContent = Spans.textContent(elements[y].props.children)
				nbytes += (textContent + "\n").length
			}
		}
	}
	return [y, x, nbytes]
}

function computeByteCount(elements, cursors, anyIterator) {
	let dir = ""
	switch (anyIterator) {
	case Iterators.RTL.rune:
	case Iterators.RTL.word:
	case Iterators.RTL.line:
		dir = "rtl"
		break
	case Iterators.LTR.rune:
	case Iterators.LTR.word:
		dir = "ltr"
		break
	default:
		// No-op
		break
	}
	let computed = null
	if (cursors.collapsed) {
		const computeCollapsedByteCount = dir === "rtl" && dir !== "ltr" ? computeCollapsedByteCountRTL
			: computeCollapsedByteCountLTR
		computed = computeCollapsedByteCount(elements, cursors, anyIterator)
	} else {
		computed = computeUncollapsedByteCount(elements, cursors)
	}
	console.log(computed)
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
	// // TODO: Selections should delete forwards?
	// dropByteCount(payload, dir) {
	// 	console.log(payload, { dir })
	//
	// 	// let { x, byteCount } = payload
	// 	// if (dir === "rtl") {
	// 	//
	// 	// 	// Computes the span and character offsets from a
	// 	// 	// cursor offset.
	// 	// 	const computeSpanOffsets = (spans, offset) => {
	// 	// 		let spanOffset = 0
	// 	// 		let characterOffset = offset
	// 	// 		for (; spanOffset < spans.length; spanOffset++) {
	// 	// 			const textContent = spans[spanOffset].props.children
	// 	// 			if (characterOffset - textContent.length <= 0) {
	// 	// 				// No-op
	// 	// 				break
	// 	// 			}
	// 	// 			characterOffset -= textContent.length
	// 	// 		}
	// 	// 		return [spanOffset, characterOffset]
	// 	// 	}
	// 	//
	// 	// 	// Drops n-bytes from an array of spans at an offset.
	// 	// 	// Returns the number of dropped bytes.
	// 	// 	const dropBytesFromSpans = (spans, offset, count) => {
	// 	// 		const [spanOffset, characterOffset] = computeSpanOffsets(spans, offset)
	// 	// 		if (count > characterOffset) {
	// 	// 			count = characterOffset
	// 	// 		}
	// 	// 		spans[spanOffset].props.children = (
	// 	// 			spans[spanOffset].props.children.slice(0, characterOffset - count) +
	// 	// 			spans[spanOffset].props.children.slice(characterOffset)
	// 	// 		)
	// 	// 		if (!spans[spanOffset].props.children) {
	// 	// 			spans.splice(spanOffset, 1)
	// 	// 		}
	// 	// 		// TODO: Decrement x here?
	// 	// 		Spans.defer(spans)
	// 	// 		return count
	// 	// 	}
	// 	//
	// 	// 	// TODO: Add support for nodes
	// 	// 	while (byteCount) {
	// 	// 		if (!state.cursors[0].offset && x) {
	// 	// 			const textContent = Spans.textContent(state.elements[x - 1].props.children)
	// 	// 			state.elements[x - 1].props.children.push(...state.elements[x].props.children)
	// 	// 			state.elements.splice(x, 1)
	// 	// 			Object.assign(state.cursors[0], {
	// 	// 				key: state.elements[x - 1].key,
	// 	// 				offset: textContent.length, // Spans.textContent(state.elements[x - 1].props.children).length,
	// 	// 			})
	// 	// 			x--
	// 	// 		}
	// 	// 		const count = dropBytesFromSpans(state.elements[x].props.children, state.cursors[0].offset, byteCount)
	// 	// 		byteCount -= count
	// 	// 		state.cursors[0].offset -= count
	// 	// 	}
	// 	// 	const collapsed = Cursors.collapse(state.cursors)
	// 	// 	this.select(collapsed)
	// 	//
	// 	// } else if (dir === "ltr") {
	// 	// 	// while (byteCount) {
	// 	// 	// 	// ...
	// 	// 	// }
	// 	// }
	// },
	backspaceRTLRune() {
		computeByteCount(state.elements, state.cursors, Iterators.RTL.rune)
	},
	backspaceRTLWord() {
		computeByteCount(state.elements, state.cursors, Iterators.RTL.word)
	},
	backspaceRTLLine() {
		computeByteCount(state.elements, state.cursors, Iterators.RTL.line)
	},
	backspaceLTRRune() {
		computeByteCount(state.elements, state.cursors, Iterators.LTR.rune)
	},
	backspaceLTRWord() {
		computeByteCount(state.elements, state.cursors, Iterators.LTR.word)
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
