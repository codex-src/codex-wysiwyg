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

// Return stateful methods for a rich text editor.
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
	// Enables display markdown mode; enables read-only mode.
	enableDisplayMarkdownMode() {
		this.registerAction("enable-display-markdown-mode")
		state.readOnlyModeEnabled = true
		state.displayMarkdownModeEnabled = true
	},
	// Disables display markdown mode; disables read-only mode.
	disableDisplayMarkdownMode() {
		this.registerAction("disable-display-markdown-mode")
		state.readOnlyModeEnabled = false
		state.displayMarkdownModeEnabled = false
	},
	// Focuses the editor.
	focus() {
		this.registerAction("focus")
		state.focused = true
	},
	// Blurs the editor.
	blur() {
		this.registerAction("blur")
		state.focused = false
	},
	// Selects a range.
	select(range) {
		this.registerAction("select")
		state.range = range
	},
	// deleteHandler(enumKey) {
	// 	this.registerAction(enumKey)
	// 	// ...
	// },
	// uncontrolledInput(children, range) {
	// 	this.registerAction("input")
	// 	// ...
	// },
})

export default RichTextEditor
