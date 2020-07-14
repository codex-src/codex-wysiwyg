// Enumerates all possible actions.
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

// Registers the timestamp and action descriptor.
export const registerAction = state => action => {
	if (!actionEnums[action]) {
		throw new Error(`useRichTextEditor.methods: action mismatch; action=${action}`)
	}
	state.lastUserActionTimestamp = Date.now()
	state.lastUserAction = action
}

// Enables read-only mode.
export const enableReadOnlyMode = state => () => {
	this.registerAction("enable-read-only-mode")
	state.readOnlyModeEnabled = true
}

// Disables read-only mode.
export const disableReadOnlyMode = state => () => {
	this.registerAction("disable-read-only-mode")
	state.readOnlyModeEnabled = false
}

// Enables display markdown mode; enables read-only mode and
// renders markdown syntax.
export const enableDisplayMarkdownMode = state => () => {
	this.registerAction("enable-display-markdown-mode")
	state.readOnlyModeEnabled = true
	state.displayMarkdownModeEnabled = true
}

// Disables display markdown mode; disables read-only mode
// and obscures markdown syntax.
export const disableDisplayMarkdownMode = state => () => {
	this.registerAction("disable-display-markdown-mode")
	state.readOnlyModeEnabled = false
	state.displayMarkdownModeEnabled = false
}
