import newEnum from "lib/x/newEnum"

const actionEnums = newEnum(
	"enable-read-only-mode",
	"disable-read-only-mode",
	"enable-display-markdown-mode",
	"disable-display-markdown-mode",
	"focus",
	"blur",
	"select",
	"backspace-rune",
	"backspace-word",
	"backspace-line",
	"delete-rune",
	"delete-word",
	"input",
)

// Registers an action.
export const registerAction = e => action => {
	if (!actionEnums[action]) {
		throw new Error(`RichTextEditor: action mismatch; action=${action}`)
	}
	e.lastActionTimestamp = Date.now()
	e.lastAction = action
}

// Enables read-only mode.
export const enableReadOnlyMode = e => () => {
	registerAction(e)("enable-read-only-mode")
	e.readOnlyModeEnabled = true
}

// Disables read-only mode.
export const disableReadOnlyMode = e => () => {
	registerAction(e)("disable-read-only-mode")
	e.readOnlyModeEnabled = false
}

// Enables display markdown mode; enables read-only mode.
export const enableDisplayMarkdownMode = e => () => {
	registerAction(e)("enable-display-markdown-mode")
	e.readOnlyModeEnabled = true
	e.displayMarkdownModeEnabled = true
}

// Disables display markdown mode; disables read-only mode.
export const disableDisplayMarkdownMode = e => () => {
	registerAction(e)("disable-display-markdown-mode")
	e.readOnlyModeEnabled = false
	e.displayMarkdownModeEnabled = false
}

// Focuses the editor.
export const focus = e => () => {
	registerAction(e)("focus")
	e.focused = true
}

// Blurs the editor.
export const blur = e => () => {
	registerAction(e)("blur")
	e.focused = false
}

// Selects a range.
export const select = e => range => {
	registerAction(e)("select")
	e.range = range
}

// deleteHandler(enumKey) {
// 	this.registerAction(enumKey)
// 	// ...
// },
// uncontrolledInput(children, range) {
// 	this.registerAction("input")
// 	// ...
// },
