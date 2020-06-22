import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import newShortUUID from "lib/newShortUUID"
import React from "react"
import useMethods from "use-methods"

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
	return { x: x1, byteCount}
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
	return { x: x, byteCount }
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
	return { x: x, byteCount }
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

		let { x, byteCount } = payload
		if (dir === "rtl") {

			// Computes the span and character offsets from a
			// cursor offset.
			const computeSpanOffsets = (spans, offset) => {
				let spanOffset = 0
				let characterOffset = offset
				for (; spanOffset < spans.length; spanOffset++) {
					const textContent = spans[spanOffset].props.children
					if (characterOffset - textContent.length <= 0) {
						// No-op
						break
					}
					characterOffset -= textContent.length
				}
				return [spanOffset, characterOffset]
			}

			// Drops n-bytes from an array of spans at an offset.
			// Returns the number of dropped bytes.
			const dropBytesFromSpans = (spans, offset, count) => {
				const [spanOffset, characterOffset] = computeSpanOffsets(spans, offset)
				if (count > characterOffset) {
					count = characterOffset
				}
				spans[spanOffset].props.children = (
					spans[spanOffset].props.children.slice(0, characterOffset - count) +
					spans[spanOffset].props.children.slice(characterOffset)
				)
				if (!spans[spanOffset].props.children) {
					spans.splice(spanOffset, 1)
				}
				// TODO: Decrement x here?
				Spans.defer(spans)
				return count
			}

			// state.elements[x - 1].props.children.push(...state.elements[x].props.children)
			// state.elements.splice(x - 1, 2, {
			// 	...state.elements[x - 1],
			// 	props: {
			// 		...state.elements[x - 1],
			// 		children: [
			// 			...state.elements[x - 1].props.children,
			// 			...state.elements[x].props.children,
			// 		],
			// 	},
			// })

			// TODO: Add support for nodes
			while (byteCount) {
				if (!state.cursors[0].offset && x) {
					const textContent = Spans.textContent(state.elements[x - 1].props.children)
					state.elements[x - 1].props.children.push(...state.elements[x].props.children)
					state.elements.splice(x, 1)
					Object.assign(state.cursors[0], {
						key: state.elements[x - 1].key,
						offset: textContent.length, // Spans.textContent(state.elements[x - 1].props.children).length,
					})
					x--
				}
				const count = dropBytesFromSpans(state.elements[x].props.children, state.cursors[0].offset, byteCount)
				byteCount -= count
				state.cursors[0].offset -= count
			}
			const collapsed = Cursors.collapse(state.cursors)
			this.select(collapsed)

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
