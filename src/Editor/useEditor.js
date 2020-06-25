import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Spans from "./Spans"
import must from "lib/must"
import newHashID from "lib/newHashID"
import React from "react"
import useMethods from "use-methods"

// Drops up to n-bytes from an array of spans at an offset.
// Returns the number of bytes dropped.
function dropBytes({ spans, offset, nbytes }) {
	// Compute the span and character offsets (offset):
	let x = 0
	for (; x < spans.length; x++) {
		if (offset - spans[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= spans[x].props.children.length
	}
	// Drop up to n-bytes:
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

// Drops bytes between cursors.
//
// TODO: Extract
function dropBytesBetweenCursors(elements, cursors) {
	let y = must(elements.findIndex(each => each.key === cursors[1].key))
	while (!Cursors.areEqual(cursors[0], cursors[1])) {
		let nbytes = cursors[1].offset - (cursors[0].key === cursors[1].key && cursors[0].offset)
		if (!nbytes && y) {
			// Read the current span (for cursors[1].offset):
			const textContent = Spans.textContent(elements[y - 1].props.children)
			// Push and defer spans:
			elements[y - 1].props.children.push(...elements[y].props.children)
			elements.splice(y, 1)
			Spans.defer(elements[y - 1].props.children)
			// Reset cursor[1]:
			Object.assign(cursors[1], {
				key: elements[y - 1].key,
				offset: textContent.length,
			})
			y--
			continue
		}
		const ref = { spans: elements[y].props.children, offset: cursors[1].offset, nbytes }
		nbytes = dropBytes(ref)
		cursors[1].offset -= nbytes
	}
}

// Computes a cursor from an Iterators.RTL method.
function computeCursorFromRTLIterator(elements, cursors, boundary) {
	const cursor = Cursors.construct()
	// Key:
	const y = must(elements.findIndex(each => each.key === cursors[0].key))
	cursor.key = elements[y].key
	// Offset:
	const textContent = Spans.textContent(elements[y].props.children).slice(0, cursors[0].offset)
	const runes = Iterators.RTL[boundary](textContent)
	cursor.offset = cursors[0].offset - runes.length // Uses "-"
	if (!runes.length && y) {
		Object.assign(cursor, {
			key: elements[y - 1].key,
			offset: Spans.textContent(elements[y - 1].props.children).length,
		})
	}
	return cursor
}

// Computes a cursor from an Iterators.LTR method.
function computeCursorFromLTRIterator(elements, cursors, boundary) {
	const cursor = Cursors.construct()
	// Key:
	const y = must(elements.findIndex(each => each.key === cursors[0].key))
	cursor.key = elements[y].key
	// Offset:
	const textContent = Spans.textContent(elements[y].props.children).slice(cursors[0].offset)
	const runes = Iterators.LTR[boundary](textContent)
	cursor.offset = cursors[0].offset + runes.length // Uses "+"
	if (!runes.length && y + 1 < elements.length) {
		Object.assign(cursor, {
			key: elements[y + 1].key,
			offset: 0,
		})
	}
	return cursor
}

// Computes a set of cursors; dir maps to "rtl" or "ltr" and
// boundary maps to "rune", "word", or "line".
//
// TODO: Extract
function computeCursorsFromIterator(elements, cursors, dir, boundary) {
	if (!cursors.collapsed) {
		return cursors
	}
	const next = {}
	if (dir === "rtl" && dir !== "ltr") {
		const one = computeCursorFromRTLIterator(elements, cursors, boundary)
		Object.assign(next, {
			...[one, cursors[0]],
			collapsed: Cursors.areEqual(one, cursors[0]),
		})
	} else {
		const one = computeCursorFromLTRIterator(elements, cursors, boundary)
		Object.assign(next, {
			...[cursors[0], one],
			collapsed: Cursors.areEqual(cursors[0], one),
		})
	}
	return next
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
		// Force rerender on <br> to a text node:
		const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
		if (!state.elements[y].props.children.length) {
			const forcedKey = newHashID(8)
			element.key = forcedKey
			collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
		}
		state.elements.splice(y, 1, element)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLRune() {
		const cursors = computeCursorsFromIterator(state.elements, state.cursors, "rtl", "rune")
		dropBytesBetweenCursors(state.elements, cursors)
		const collapsed = Cursors.collapse(cursors)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLWord() {
		const cursors = computeCursorsFromIterator(state.elements, state.cursors, "rtl", "word")
		dropBytesBetweenCursors(state.elements, cursors)
		const collapsed = Cursors.collapse(cursors)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceRTLLine() {
		const cursors = computeCursorsFromIterator(state.elements, state.cursors, "rtl", "line")
		dropBytesBetweenCursors(state.elements, cursors)
		const collapsed = Cursors.collapse(cursors)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceLTRRune() {
		const cursors = computeCursorsFromIterator(state.elements, state.cursors, "ltr", "rune")
		dropBytesBetweenCursors(state.elements, cursors)
		const collapsed = Cursors.collapse(cursors)
		this.select(collapsed)
		state.shouldRenderElements++
	},
	backspaceLTRWord() {
		const cursors = computeCursorsFromIterator(state.elements, state.cursors, "ltr", "word")
		dropBytesBetweenCursors(state.elements, cursors)
		const collapsed = Cursors.collapse(cursors)
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
