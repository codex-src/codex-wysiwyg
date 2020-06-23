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

// Drops bytes from a set of cursors.
function dropBytesFromCursors(state, cursors) {
	// ...
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
		// Force rerender on <br> to a text node:
		if (!state.elements[x].props.children.length) {
			const forcedKey = newShortUUID()
			element.key = forcedKey
			// NOTE: Updates collapsed[1].key because references
			// are shared.
			collapsed[0].key = forcedKey
		}
		state.elements.splice(x, 1, element)
		this.select(collapsed)
	},
	backspaceRTLRune() {
		const cursors = computeCursorsFromIterator(state, "rtl", "rune")
		dropBytesFromCursors(state, cursors)
		const collapsed = Cursors.collapseToStart(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
	},
	backspaceRTLWord() {
		const cursors = computeCursorsFromIterator(state, "rtl", "word")
		dropBytesFromCursors(state, cursors)
		const collapsed = Cursors.collapseToStart(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
	},
	backspaceRTLLine() {
		const cursors = computeCursorsFromIterator(state, "rtl", "line")
		dropBytesFromCursors(state, cursors)
		const collapsed = Cursors.collapseToStart(cursors)
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
	},
	backspaceLTRRune() {
		const cursors = computeCursorsFromIterator(state, "ltr", "rune")
		dropBytesFromCursors(state, cursors)
		const collapsed = Cursors.collapseToEnd(cursors) // NOTE: Use Cursors.collapseToEnd.
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
	},
	backspaceLTRWord() {
		const cursors = computeCursorsFromIterator(state, "ltr", "word")
		dropBytesFromCursors(state, cursors)
		const collapsed = Cursors.collapseToEnd(cursors) // NOTE: Use Cursors.collapseToEnd.
		state.elements = [...state.elements] // DEBUG
		this.select(collapsed)
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
