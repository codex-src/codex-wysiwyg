// import { rangeIsCollapsed } from "../../types/Range"
import applyFormatImpl from "./applyFormatImpl"
import deleteImpl from "./deleteImpl"
import findIndex from "../../utils/findIndex"
import JSONClone from "lib/JSON/JSONClone"

// import { // Unsorted
// 	extendRTLImpl,
// 	extendLTRImpl,
// } from "./extendImpl"

// Unexported; collapses the current range end-to-start.
const collapseToStart = e => () => {
	e.range.end = e.range.start
}

// Unexported; drops the pending range.
const dropPendingRange = e => () => {
	e.pendingRange = null
}

// Unexported; rerenders.
const render = e => () => {
	e.shouldRerender++
}

// Unexported; records an action.
const record = e => actionType => {
	const now = Date.now()
	if (actionType === "select" && now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = actionType
}

// Manually updates elements.
export const manuallyUpdateElements = e => elements => {
	record(e)("init")
	e.elements = elements
	render(e)()
}

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
	dropPendingRange(e)()
	e.range = range
}

// Inserts text at the current range.
const insertTextImpl = e => key => {
	const ch = e.elements.find(each => each.key === e.range.start.key)
		.props.children

	// Get the current text node:
	const tx = findIndex(ch, e.range.start.offset)
	let originalTextNode = {
		types: {},
		props: {
			children: "",
		},
	}
	if (tx < ch.length) {
		originalTextNode = JSONClone(ch[tx])
	}

	deleteImpl(e)()

	// Push the new text node:
	const x = findIndex(ch, e.range.start.offset)
	ch.splice(x, 0, {
		...originalTextNode,
		props: {
			...originalTextNode.props,
			children: key,
		},
	})
}

// Implementation methods implement an action but do not
// record the currect action or mutate the range.

// Inserts text at the current range.
export const insertText = e => key => {
	record(e)("insert-text")
	insertTextImpl(e)(key)
	e.range.start.offset += key.length
	collapseToStart(e)()
	render(e)()
}

// Applies a format to the current range.
export const applyFormat = e => keyDownType => {
	const formatType = keyDownType.split("-").slice(-1)[0]

	record(e)(`apply-format-${formatType}`)
	applyFormatImpl(e)(formatType)
	render(e)()
}

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export const $delete = e => keyDownType => {
	const [dir, boundary] = keyDownType.split("-").slice(1)

	record(e)(`delete-${dir}-${boundary}`)
	deleteImpl(e)(dir, boundary)
	collapseToStart(e)()
	render(e)()
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	record(e)("input")
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	render(e)()
}
