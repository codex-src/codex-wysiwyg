import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import JSONCopy from "lib/JSONCopy"
import newShortUUID from "lib/newShortUUID"
import React from "react"
import useMethods from "use-methods"

// // Computes the byte count between cursors.
// function computeByteCount(elements, cursors) {
// 	let byteCount = cursors[1].offset - cursors[0].offset
// all: // eslint-disable-line
// 	for (let y = 0; y < elements.length; y++) {
// 		if (elements[y].key === cursors[0].key) {
// 			for (; y < elements.length; y++) {
// 				if (elements[y].key === cursors[1].key) {
// 					break all
// 				}
// 				const textContent = Spans.textContent(elements[y].props.children)
// 				byteCount += (textContent + "\n").length
// 			}
// 		}
// 	}
// 	return byteCount // byteCount
// }

// Computes a cursor from an Iterators.RTL method.
function computeCursorFromRTLIterator(state, boundary) {
	const cursor = Cursors.construct()

	// Compute key:
	const y = state.elements.findIndex(each => each.key === state.cursors[0].key)
	cursor.key = state.elements[y].key

	// Compute offset:
	const textContent = Spans.textContent(state.elements[y].props.children).slice(0, state.cursors[0].offset)
	cursor.offset = state.cursors[0].offset - Iterators.RTL[boundary](textContent).length
	if (!cursor.offset && y) {
		Object.assign(cursor, {
			key: state.elements[y - 1].key,
			offset: Spans.textContent(state.elements[y - 1].props.children),
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
	cursor.offset = state.cursors[0].offset + Iterators.LTR[boundary](textContent).length
	if (!cursor.offset && y + 1 < state.elements.length) {
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
		const x = state.elements.findIndex(each => each.key === collapsed[0].key)
		if (x === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		// Force rerender <br> to text nodes:
		if (!state.elements[x].props.children.length) {
			const forcedKey = newShortUUID()
			element.key = forcedKey
			collapsed[0].key = forcedKey // Updates collapsed[1].key because references are shared
		}
		state.elements.splice(x, 1, element)
		this.select(collapsed)
	},
	backspaceRTLRune() {
		const cursors = computeCursorsFromIterator(state, "rtl", "rune")
		console.log(JSONCopy(cursors))
	},
	backspaceRTLWord() {
		const cursors = computeCursorsFromIterator(state, "rtl", "word")
		console.log(JSONCopy(cursors))
	},
	backspaceRTLLine() {
		const cursors = computeCursorsFromIterator(state, "rtl", "line")
		console.log(JSONCopy(cursors))
	},
	backspaceLTRRune() {
		const cursors = computeCursorsFromIterator(state, "ltr", "rune")
		console.log(JSONCopy(cursors))
	},
	backspaceLTRWord() {
		const cursors = computeCursorsFromIterator(state, "ltr", "word")
		console.log(JSONCopy(cursors))
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
