import applyFormatImpl from "./applyFormatImpl"
import deleteImpl from "./deleteImpl"
import extendLTRImpl from "./extendLTRImpl"
import extendRTLImpl from "./extendRTLImpl"
import insertTextImpl from "./insertTextImpl"
import { rangeIsCollapsed } from "../types/Range"

// Collapses the current range end-to-start.
function collapseToStart(e) {
	e.range.end = e.range.start
}

// Rerenders the current state.
function render(e) {
	e.shouldRerender++
}

/*
 *
 */

// Manually updates elements.
export function manuallyUpdateElements(e, { type, elements }) {
	e.elements = elements
	render(e)
}

// Inserts text at the current range.
export function insertText(e, { type, text }) {
	insertTextImpl(e, text)
	e.range.start.offset += text.length
	collapseToStart(e)
	render(e)
}

// const formatType = keyDownType.split("-").slice(-1)[0]

// Applies a format to the current range.
//
// TODO: Add props argument
export function applyFormat(e, { type, formatType }) {
	applyFormatImpl(e, formatType)
	render(e)
}

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export function $delete(e, { type, deleteType }) {
	const [dir, boundary] = deleteType.split("-")
	if (rangeIsCollapsed(e.range)) {
		const extendImpl = dir === "rtl" && dir !== "ltr" ? extendRTLImpl : extendLTRImpl
		extendImpl(e, boundary)
	}
	deleteImpl(e, dir, boundary)
	collapseToStart(e)
	render(e)
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { type, children, range }) {
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	render(e)
}
