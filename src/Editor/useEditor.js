import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import JSONCopy from "lib/JSONCopy"
import newShortUUID from "lib/newShortUUID"
import React from "react"
import useMethods from "use-methods"

// Computes a cursor from an Iterators.RTL method.
function computeCursorFromRTLIterator(state, boundary) {
	const cursor = Cursors.construct()
	// Compute key:
	const y = state.elements.findIndex(each => each.key === state.cursors[0].key)
	cursor.key = state.elements[y].key
	// Compute offset:
	const textContent = Spans.textContent(state.elements[y].props.children).slice(0, state.cursors[0].offset)
	const runes = Iterators.RTL[boundary](textContent)
	cursor.offset = state.cursors[0].offset - runes.length // Uses "-"
	if (!runes.length && y) {
		Object.assign(cursor, {
			key: state.elements[y - 1].key,
			offset: Spans.textContent(state.elements[y - 1].props.children).length,
		})
	}
	return cursor
}

// Computes a cursor from an Iterators.LTR method.
function computeCursorFromLTRIterator(state, boundary) {
	const cursor = Cursors.construct()
	// Compute key:
	const y = state.elements.findIndex(each => each.key === state.cursors[0].key)
	cursor.key = state.elements[y].key
	// Compute offset:
	const textContent = Spans.textContent(state.elements[y].props.children).slice(state.cursors[0].offset)
	const runes = Iterators.LTR[boundary](textContent)
	cursor.offset = state.cursors[0].offset + runes.length // Uses "+"
	if (!runes.length && y + 1 < state.elements.length) {
		Object.assign(cursor, {
			key: state.elements[y + 1].key,
			offset: 0,
		})
	}
	return cursor
}

// Computes a set of cursors; dir maps to "rtl" or "ltr" and
// boundary maps to "rune", "word", or "line".
function computeCursorsFromIterator(state, dir, boundary) {
	if (!state.cursors.collapsed) {
		return state.cursors
	}
	const cursors = {}
	if (dir === "rtl" && dir !== "ltr") {
		const cursor = computeCursorFromRTLIterator(state, boundary)
		Object.assign(cursors, {
			...[cursor, state.cursors[0]],
			collapsed: Cursors.areEqual(cursor, state.cursors[0]),
		})
	} else {
		const cursor = computeCursorFromLTRIterator(state, boundary)
		Object.assign(cursors, {
			...[state.cursors[0], cursor],
			collapsed: Cursors.areEqual(state.cursors[0], cursor),
		})
	}
	return cursors
}

// // Computes the span and character offsets from a
// // cursor offset.
// const computeSpanOffsets = (spans, offset) => {
// 	let spanOffset = 0
// 	let characterOffset = offset
// 	for (; spanOffset < spans.length; spanOffset++) {
// 		const textContent = spans[spanOffset].props.children
// 		if (characterOffset - textContent.length <= 0) {
// 			// No-op
// 			break
// 		}
// 		characterOffset -= textContent.length
// 	}
// 	return [spanOffset, characterOffset]
// }
//
// // Drops n-bytes from an array of spans at an offset.
// // Returns the number of dropped bytes.
// const dropBytesFromSpans = (spans, offset, count) => {
// 	const [spanOffset, characterOffset] = computeSpanOffsets(spans, offset)
// 	if (count > characterOffset) {
// 		count = characterOffset
// 	}
// 	spans[spanOffset].props.children = (
// 		spans[spanOffset].props.children.slice(0, characterOffset - count) +
// 		spans[spanOffset].props.children.slice(characterOffset)
// 	)
// 	if (!spans[spanOffset].props.children) {
// 		spans.splice(spanOffset, 1)
// 	}
// 	// TODO: Decrement x here?
// 	Spans.defer(spans)
// 	return count
// }
//
// // TODO: Add support for nodes
// while (byteCount) {
// 	if (!state.cursors[0].offset && x) {
// 		const textContent = Spans.textContent(state.elements[x - 1].props.children)
// 		state.elements[x - 1].props.children.push(...state.elements[x].props.children)
// 		state.elements.splice(x, 1)
// 		x--
// 	}
// 	const count = dropBytesFromSpans(state.elements[x].props.children, state.cursors[0].offset, byteCount)
// 	byteCount -= count
// }

// Drops bytes between a set of cursors.
function dropBytesBetweenCursors(state, cursors) {

	// Drops up to n bytes from an array of spans at an
	// offset. Returns the number of bytes dropped.
	const dropBytesFromSpans = (spans, offset, nbytes) => {
		// Compute span offsets:
		//
		// NOTE: "offset" becomes the character offset.
		let x = 0
		for (; x < spans.length; x++) {
			if (offset - spans[x].props.children.length <= 0) {
				// No-op
				break
			}
			offset -= spans[x].props.children.length
		}
		// Drop up to n bytes from span[x]:
		nbytes = Math.min(nbytes, offset)
		spans[x].props.children = (
			spans[x].props.children.slice(0, offset - nbytes) +
			spans[x].props.children.slice(offset)
		)
		if (!spans[x].props.children) {
			spans.splice(x, 1)
		}
		Spans.defer(spans)
		return nbytes
	}

	const y = state.elements.findIndex(each => each.key === cursors[1].key)
	while (!Cursors.areEqual(cursors[0], cursors[1])) {
		let nbytes = cursors[1].offset
		if (cursors[0].key === cursors[1].key) {
			nbytes -= cursors[0].offset
		}
		nbytes = dropBytesFromSpans(state.elements[y].props.children, cursors[1].offset, nbytes)
		cursors[1].offset -= nbytes
		// if (...) {
		// 	// ...
		// }
	}

}

const methods = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(cursors) {
		state.cursors = cursors
	},
	input(element, collapsed) {
		const y = state.elements.findIndex(each => each.key === collapsed[0].key)
		if (y === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		// Force rerender on <br> to a text node:
		if (!state.elements[y].props.children.length) {
			const forcedKey = newShortUUID()
			element.key = forcedKey
			// NOTE: Updates collapsed[1].key because references
			// are shared.
			collapsed[0].key = forcedKey
		}
		state.elements.splice(y, 1, element)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLRune() {
		const cursors = computeCursorsFromIterator(state, "rtl", "rune")
		dropBytesBetweenCursors(state, cursors)
		const collapsed = Cursors.collapse(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLWord() {
		const cursors = computeCursorsFromIterator(state, "rtl", "word")
		dropBytesBetweenCursors(state, cursors)
		const collapsed = Cursors.collapse(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLLine() {
		const cursors = computeCursorsFromIterator(state, "rtl", "line")
		dropBytesBetweenCursors(state, cursors)
		const collapsed = Cursors.collapse(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceLTRRune() {
		const cursors = computeCursorsFromIterator(state, "ltr", "rune")
		dropBytesBetweenCursors(state, cursors)
		const collapsed = Cursors.collapse(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceLTRWord() {
		const cursors = computeCursorsFromIterator(state, "ltr", "word")
		dropBytesBetweenCursors(state, cursors)
		const collapsed = Cursors.collapse(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
		state.shouldRenderElements++
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
		shouldRenderElements: 0,
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
