import * as Cursors from "../Cursors"
import * as Iterators from "../Iterators"
import * as Spans from "../Spans"
import dropCursors from "./dropCursors"
import must from "lib/must"

// Returns the next right-to-left (RTL) cursor for a
// boundary.
function nextRTLCursor(elements, { ...rtl }, boundary) {
	const y = must(elements.findIndex(each => each.key === rtl.key))
	const substr = Spans.textContent(elements[y].props.children).slice(0, rtl.offset)
	if (!rtl.offset && y) {
		Object.assign(rtl, {
			key: elements[y - 1].key,
			offset: Spans.textContent(elements[y - 1].props.children).length,
		})
		return rtl
	}
	const runes = Iterators.RTL[boundary](substr)
	rtl.offset -= runes.length
	return rtl
}

// Returns the next left-to-right (LTR) cursor.
function nextLTRCursor(elements, { ...ltr }, boundary) {
	const y = must(elements.findIndex(each => each.key === ltr.key))
	const substr = Spans.textContent(elements[y].props.children).slice(ltr.offset)
	if (ltr.offset === substr.length && y + 1 < elements.length) {
		Object.assign(ltr, {
			key: elements[y + 1].key,
			offset: Spans.textContent(elements[y + 1].props.children).length,
		})
		return ltr
	}
	const runes = Iterators.LTR[boundary](substr)
	ltr.offset += runes.length
	return ltr
}

// Returns the next set of cursors for a direction and a
// boundary.
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

// Backspace handler. Returns a collapsed set of cursors.
// dir maps to "rtl" or "ltr" and boundary maps to "rune",
// "word", or "line".
function backspace(elements, cursors, dir, boundary) {
	const next = nextCursors(elements, cursors, dir, boundary)
	dropCursors(elements, next)
	return Cursors.collapse(next)
}

export default backspace
