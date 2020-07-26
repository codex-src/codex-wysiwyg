import applyFormatImpl from "./implementation/applyFormatImpl"
import deleteImpl from "./implementation/deleteImpl"
import extendLTRImpl from "./implementation/extendLTRImpl"
import extendRTLImpl from "./implementation/extendRTLImpl"
import insertTextImpl from "./implementation/insertTextImpl"
import JSONClone from "lib/JSON/JSONClone"
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

// Selects a range; drops the current range-in-progress.
export function select(e, { range }) {
	e.applyType = null
	e.range = range
}

// Inserts text at the current range.
export function insertText(e, { type, text }) {
	if (rangeIsCollapsed(e.range) && e.applyType) {
		insertTextImpl(e, text)
		e.range.end.offset += text.length
		e.range.start = e.applyType.range.start
		// TODO: Add support for "plaintext" here? Can we just
		// use "" to indicate plaintext?
		applyFormatImpl(e, Object.keys(e.applyType.types)[0]) // TODO
		e.range.start = e.range.end
	} else if (!rangeIsCollapsed(e.range)) {
		insertTextImpl(e, text)
		e.range.start.offset += text.length
		e.range.end = e.range.start
	}
	e.shouldRerender++
}

// Applies a format to the current range.
//
// TODO: Add props argument
export function applyFormat(e, { formatType }) {
	if (rangeIsCollapsed(e.range)) {
		if (!e.applyType) {
			e.applyType = {
				types: {},
				range: {},
			}
		}
		// TODO: Get the current types; inverse formatType and
		// or propagate "plaintext" or ""
		e.applyType.types[formatType] = {} // TODO
		e.applyType.range = JSONClone(e.range)
		return
	}
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
