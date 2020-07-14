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

const RichTextEditor = state => ({
	// Registers an action.
	registerAction(action) {
		if (!actionEnums[action]) {
			throw new Error(`RichTextEditor: action mismatch; action=${action}`)
		}
		state.lastActionTimestamp = Date.now()
		state.lastAction = action
	},
	// Enables read-only mode.
	enableReadOnlyMode() {
		this.registerAction("enable-read-only-mode")
		state.readOnlyModeEnabled = true
	},
	// Disables read-only mode.
	disableReadOnlyMode() {
		this.registerAction("disable-read-only-mode")
		state.readOnlyModeEnabled = false
	},
	// Enables display markdown mode; enables read-only mode and
	// renders markdown syntax.
	enableDisplayMarkdownMode() {
		this.registerAction("enable-display-markdown-mode")
		state.readOnlyModeEnabled = true
		state.displayMarkdownModeEnabled = true
	},
	// Disables display markdown mode; disables read-only mode
	// and obscures markdown syntax.
	disableDisplayMarkdownMode() {
		this.registerAction("disable-display-markdown-mode")
		state.readOnlyModeEnabled = false
		state.displayMarkdownModeEnabled = false
	},
	focus() {
		this.registerAction("focus")
		state.focused = true
	},
	blur() {
		this.registerAction("blur")
		state.focused = false
	},
	// select(range) {
	// 	this.registerAction("select")
	// },
	// deleteHandler(enumKey) {
	// 	this.registerAction(enumKey)
	// },
	// uncontrolledInput(children, range) {
	// 	this.registerAction("input")
	// },
})

// focus() {
// 	this.registerAction("focus")
// 	Editor(state).focus(arguments)
// },
// blur() {
// 	this.registerAction("blur")
// 	Editor(state).blur(arguments)
// },
// select(range) {
// 	this.registerAction("select")
// 	Editor(state).select(arguments)
// },
// deleteHandler(enumKey) {
// 	this.registerAction(enumKey)
// 	Editor(state).deleteHandler(arguments)
// },
// uncontrolledInput(children, range) {
// 	this.registerAction("input")
// 	Editor(state).uncontrolledInput(arguments)
// },

export default RichTextEditor
