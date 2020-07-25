import applyFormatImpl from "./implementation/applyFormatImpl"
import deleteImpl from "./implementation/deleteImpl"
import extendLTRImpl from "./implementation/extendLTRImpl"
import extendRTLImpl from "./implementation/extendRTLImpl"
import insertTextImpl from "./implementation/insertTextImpl"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Manually updates elements.
export function manuallyUpdateElements(e, { type, elements }) {
	e.elements = elements
	e.shouldRerender++
}

// Focuses the editor.
export function focus(e) {
	e.focused = true
}

// Blurs the editor.
export function blur(e) {
	e.focused = false
}

// Selects a range.
export function select(e, { range }) {
	e.range = range
}

// Inserts text at the current range.
export function insertText(e, { type, text }) {
	insertTextImpl(e, text)
	e.range.start.offset += text.length
	e.range.end = e.range.start
	e.shouldRerender++
}

// Applies a format to the current range.
//
// TODO: Add props argument
export function applyFormat(e, { type, formatType }) {
	applyFormatImpl(e, formatType)
	e.shouldRerender++
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
	e.range.end = e.range.start
	e.shouldRerender++
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { type, children, range }) {
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	e.shouldRerender++
}
