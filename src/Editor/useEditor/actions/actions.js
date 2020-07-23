// import * as ElementList from "../../methods/ElementList"
// import defer from "../../utils/children/defer"
import applyFormatImpl from "./applyFormatImpl"
import deleteImpl from "./deleteImpl"

import { // Unsorted
	extendRTLImpl,
	extendLTRImpl,
} from "./extendImpl"

// Unexported; records an action.
const recordAction = e => actionType => {
	const now = Date.now()
	if (now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = actionType
}

// Enables read-only mode.
export const enableReadOnlyMode = e => () => {
	recordAction(e)("enable-read-only-mode")
	e.readOnlyModeEnabled = true
}

// Disables read-only mode.
export const disableReadOnlyMode = e => () => {
	recordAction(e)("disable-read-only-mode")
	e.readOnlyModeEnabled = false
}

// Focuses the editor.
export const focus = e => () => {
	recordAction(e)("focus")
	e.focused = true
}

// Blurs the editor.
export const blur = e => () => {
	recordAction(e)("blur")
	e.focused = false
}

// Selects a range.
export const select = e => range => {
	recordAction(e)("select")
	e.range = range
}

// Inserts text at the current range.
export const insertText = e => text => {
	recordAction(e)("insert-text")
	if (!e.range.collapsed()) {
		deleteImpl(e)()
	}
	// ...
	collapseToStart(e)()
	render(e)()
}

// Applies a format to the current range.
export const applyFormat = e => keyDownType => {
	const formatType = keyDownType.split("-").slice(-1)[0]

	recordAction(e)("apply-format")
	applyFormatImpl(e)(formatType)
	render(e)()
}

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export const $delete = e => keyDownType => {
	const [dir, boundary] = keyDownType.split("-").slice(1)

	recordAction(e)(`delete-${dir}-${boundary}`)
	if (e.range.collapsed()) {
		const extend = dir === "rtl" && dir !== "ltr" ? extendRTLImpl : extendLTRImpl
		extend(e)(boundary)
	}
	deleteImpl(e)()
	collapseToStart(e)()
	render(e)()
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	const element = e.elements.find(each => each.key === range.start.key)
	element.props.children = children
	e.range = range
	render(e)()
}

// Unexported; collapses end-to-start.
const collapseToStart = e => () => {
	e.range.end = e.range.start
}

// Unexported; rerenders.
const render = e => () => {
	e.shouldRerender++
}
