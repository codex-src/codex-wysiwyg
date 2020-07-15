import newEnum from "lib/x/newEnum"

const actionEnum = newEnum(
	"ENABLE_READ_ONLY_MODE",
	"DISABLE_READ_ONLY_MODE",
	"ENABLE_DISPLAY_MARKDOWN_MODE",
	"DISABLE_DISPLAY_MARKDOWN_MODE",
	"FOCUS",
	"BLUR",
	"SELECT",
	"BACKSPACE_RUNE",
	"BACKSPACE_WORD",
	"BACKSPACE_LINE",
	"DELETE_RUNE",
	"DELETE_WORD",
	"INPUT",
)

// if (!actionEnum[action]) {
// 	throw new Error(`RichTextEditor: action mismatch; action=${action}`)
// }

// Registers an action.
export const registerAction = e => action => {
	const now = Date.now()
	if (now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = action
}

// Enables read-only mode.
export const enableReadOnlyMode = e => () => {
	registerAction(e)(actionEnum.ENABLE_READ_ONLY_MODE)
	e.readOnlyModeEnabled = true
}

// Disables read-only mode.
export const disableReadOnlyMode = e => () => {
	registerAction(e)(actionEnum.DISABLE_READ_ONLY_MODE)
	e.readOnlyModeEnabled = false
}

// Enables display markdown mode; enables read-only mode.
export const enableDisplayMarkdownMode = e => () => {
	registerAction(e)(actionEnum.ENABLE_DISPLAY_MARKDOWN_MODE)
	e.readOnlyModeEnabled = true
	e.displayMarkdownModeEnabled = true
}

// Disables display markdown mode; disables read-only mode.
export const disableDisplayMarkdownMode = e => () => {
	registerAction(e)(actionEnum.DISABLE_DISPLAY_MARKDOWN_MODE)
	e.readOnlyModeEnabled = false
	e.displayMarkdownModeEnabled = false
}

// Focuses the editor.
export const focus = e => () => {
	registerAction(e)(actionEnum.FOCUS)
	e.focused = true
}

// Blurs the editor.
export const blur = e => () => {
	registerAction(e)(actionEnum.BLUR)
	e.focused = false
}

// Selects a range.
export const select = e => range => {
	registerAction(e)(actionEnum.SELECT)
	e.range = range
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	registerAction(e)(actionEnum.INPUT)
	const el = e.elements.find(each => each.key === range.start.key) // TODO: Add support for nested elements
	el.props.children = children
	e.range = range
	e.shouldRerender++
}

// TODO: Add render?

// deleteHandler(enumKey) {
// 	this.registerAction(enumKey)
// 	// ...
// },
// uncontrolledInput(children, range) {
// 	this.registerAction("input")
// 	// ...
// },
