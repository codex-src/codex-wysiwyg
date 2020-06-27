import * as Cursors from "../Cursors"
import * as Iterators from "../Iterators"
import * as Spans from "../Spans"
import dropCursors from "./dropCursors"
import must from "lib/must"

// Returns the next right-to-left cursor for a boundary.
function nextRTLCursor(elements, { ...rtl }, boundary) {
	const y = must(elements.findIndex(each => each.key === rtl.key))
	const textContent = Spans.textContent(elements[y].props.children)
	if (!rtl.offset && y) {
		Object.assign(rtl, {
			key: elements[y - 1].key,
			offset: Spans.textContent(elements[y - 1].props.children).length,
		})
		return rtl
	}
	const substr = Iterators.RTL[boundary](textContent.slice(0, rtl.offset))
	rtl.offset -= substr.length
	return rtl
}

// Returns the next left-to-right cursor for a boundary.
function nextLTRCursor(elements, { ...ltr }, boundary) {
	const y = must(elements.findIndex(each => each.key === ltr.key))
	const textContent = Spans.textContent(elements[y].props.children)
	if (ltr.offset === textContent.length && y + 1 < elements.length) {
		Object.assign(ltr, {
			key: elements[y + 1].key,
			offset: 0,
		})
		return ltr
	}
	const substr = Iterators.LTR[boundary](textContent.slice(ltr.offset))
	ltr.offset += substr.length
	return ltr
}

// Returns the next set of cursors.
function nextCursors(elements, cursors, dir, boundary) {
	if (!cursors.collapsed) {
		return cursors
	}
	const next = {}
	if (dir === "rtl" && dir !== "ltr") {
		const rtl = nextRTLCursor(elements, cursors[0], boundary)
		Object.assign(next, {
			...[rtl, cursors[0]],
			collapsed: Cursors.areEqual(rtl, cursors[0]),
		})
	} else {
		const ltr = nextLTRCursor(elements, cursors[0], boundary)
		Object.assign(next, {
			...[cursors[0], ltr],
			collapsed: Cursors.areEqual(cursors[0], ltr),
		})
	}
	return next
}

// Backspace handler for both directions and all boundaries.
// Returns the next set of collapsed cursors.
function backspace(elements, cursors, dir, boundary) {
	const next = nextCursors(elements, cursors, dir, boundary)
	dropCursors(elements, next)
	return Cursors.collapse(next)
}

export default backspace
