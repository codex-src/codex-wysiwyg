// import * as ElementList from "../../methods/ElementList"
// import defer from "../../utils/defer"
import applyFormatImpl from "./applyFormatImpl"
import deleteImpl from "./deleteImpl"
import { default as record } from "./recordActionImpl"
import { rangeIsCollapsed } from "../../methods/Range"

import { // Unsorted
	extendRTLImpl,
	extendLTRImpl,
} from "./extendImpl"

// Unexported; collapses the current range end-to-start.
const collapseToStart = e => () => {
	e.range.end = e.range.start
}

// Unexported; rerenders.
const render = e => () => {
	e.shouldRerender++
}

// // Enables read-only mode.
// export const enableReadOnlyMode = e => () => {
// 	record(e)("enable-read-only-mode")
// 	e.readOnlyModeEnabled = true
// }
//
// // Disables read-only mode.
// export const disableReadOnlyMode = e => () => {
// 	record(e)("disable-read-only-mode")
// 	e.readOnlyModeEnabled = false
// }

// Focuses the editor.
export const focus = e => () => {
	record(e)("focus")
	e.focused = true
}

// Blurs the editor.
export const blur = e => () => {
	record(e)("blur")
	e.focused = false
}

// Selects a range.
export const select = e => range => {
	record(e)("select")
	e.range = range
}

// Inserts text at the current range.
export const insertText = e => text => {
	record(e)("insert-text")
	if (!rangeIsCollapsed(e.range)) {
		deleteImpl(e)()
	}
	// TODO
	collapseToStart(e)()
	render(e)()
}

// Applies a format to the current range.
export const applyFormat = e => keyDownType => {
	const formatType = keyDownType.split("-").slice(-1)[0]

	record(e)("apply-format")
	applyFormatImpl(e)(formatType)
	render(e)()
}

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export const $delete = e => keyDownType => {
	const [dir, boundary] = keyDownType.split("-").slice(1)

	record(e)(`delete-${dir}-${boundary}`)
	if (rangeIsCollapsed(e.range)) {
		const extend = dir === "rtl" && dir !== "ltr" ? extendRTLImpl : extendLTRImpl
		extend(e)(boundary)
	}
	deleteImpl(e)()
	collapseToStart(e)()
	render(e)()
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	record(e)("input")
	const element = e.elements.find(each => each.key === range.start.key)
	element.props.children = children
	e.range = range
	render(e)()
}
