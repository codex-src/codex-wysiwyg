import addOrRemoveTypesOnSelection from "./addOrRemoveTypesOnSelection"
import deleteOnSelection from "./deleteOnSelection"
import extendRangeLTR from "./extendRangeLTR"
import extendRangeRTL from "./extendRangeRTL"
import getIndexAtOffset from "./getIndexAtOffset"
import getRangeTypes from "./getRangeTypes"
import getShorthandVars from "./getShorthandVars"
import insertHardParagraphAtCollapsed from "./insertHardParagraphAtCollapsed"
import insertTextAtCollapsed from "./insertTextAtCollapsed"
import JSONClone from "lib/JSON/JSONClone"
import testForSelection from "./testForSelection"

// Collapses the current range end-to-start.
function collapseToStart(e) {
	e.range.end = e.range.start
}

// Rerenders the current state.
function render(e) {
	e.shouldRerender++
}

// Manually updates elements.
export function manuallyUpdateElements(e, { elements }) {
	e.elements = elements
	render(e)
}

// Focuses the editor. Note that focusing the editor is
// expected to enable future edits.
export function focus(e) {
	e.focused = true
}

// Blurs the editor. Note that blurring the editor is
// expected to disable future edits.
export function blur(e) {
	e.focused = false
}

// Selects a range and recomputes state.rangeTypes.
export function select(e, { range }) {
	e.range = range
	e.rangeTypes = getRangeTypes(e)
}

// Clones the start text node or returns an empty text node.
function cloneStartTextNode(e) {
	const { ch1 } = getShorthandVars(e)
	let textNode = {
		types: {},
		props: {
			children: "",
		},
	}
	const x = getIndexAtOffset(ch1, e.range.start.offset + testForSelection(e))
	if (x >= 0) {
		textNode = JSONClone(ch1[x])
	}
	return textNode
}

// Inserts text at the current range.
export function insertText(e, { insertText: text }) {
	const clonedTextNode = cloneStartTextNode(e)
	if (testForSelection(e)) {
		deleteOnSelection(e)
		collapseToStart(e)
	}
	insertTextAtCollapsed(e, clonedTextNode, text)
	e.range.start.offset += text.length
	collapseToStart(e)
	render(e)
}

// if (collapsed(e)) {
// 	if (!e.applyType) {
// 		e.applyType = {
// 			types: {},
// 			range: {},
// 		}
// 	}
// 	// TODO: Get the current types; inverse formatType and
// 	// or propagate "plaintext" or ""
// 	e.applyType.types[formatType] = {} // TODO
// 	e.applyType.range = JSONClone(e.range)
// 	return
// }

// Adds or removes types from the current range.
export function addOrRemoveTypes(e, { types }) {
	// const $applyFormat = !collapsed(e) ? applyFormatCollapsed : applyTypeSelection
	// $applyFormat(e, formatType)

	addOrRemoveTypesOnSelection(e, types)
	render(e)
}

// Inserts a hard paragraph at the current range.
export function insertHardParagraph(e) {
	if (testForSelection(e)) {
		deleteOnSelection(e)
		collapseToStart(e)
	}
	e.range.start = insertHardParagraphAtCollapsed(e)
	collapseToStart(e)
	render(e)
}

// Deletes the next word, rune, line or the current range.
export function $delete(e, { deleteType }) {
	const [dir, boundary] = deleteType.split("-")
	if (!testForSelection(e)) {
		const extendRange = dir === "rtl" && dir !== "ltr" ? extendRangeRTL : extendRangeLTR
		extendRange(e, boundary)
	}
	deleteOnSelection(e)
	collapseToStart(e)
	render(e)
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { children, range }) {
	const { el1 } = getShorthandVars(e)
	el1.props.children = children
	e.range = range
	collapseToStart(e)
	render(e)
}
