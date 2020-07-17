// TODO: Rename to methods?

// Records an action; records the timestamp and action type.
export const recordAction = e => actionType => {
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

// Controlled delete handler; deletes the next right-to-left
// or left-to-right rune, word, or line.
export const controlledDelete = e => keydownType => {
	recordAction(e)(keydownType)
	// ...
}

// Uncontrolled input handler.
//
// TODO: Add support for nested elements
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	e.shouldRerender++
}

// TODO: Add render?
