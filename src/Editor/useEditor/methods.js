import $delete from "./delete"
import applyFormat from "./applyFormat"

// TODO: Add findElementOrNode API or equivalent?
const methods = state => ({
	// Locks the editor; disables future edits. Unlike blur,
	// lock is expected to remove the DOM attribute
	// contenteditable.
	lock() {
		state.locked = true
	},
	// Unlocks the editor; enables future edits. Unlike focus,
	// unlock is expected to add the DOM attribute
	// contenteditable.
	unlock() {
		state.locked = false
	},
	// Focuses the editor. When the editor is focused, editing
	// operations are expected to work.
	focus() {
		state.focused = true
	},
	// Blurs the editor. When the editor is blurred, editing
	// operations are not expected to work.
	blur() {
		state.focused = false
	},
	// Selects a range.
	select(range) {
		state.range = range
	},
	// Applies a format to the current range.
	applyFormat(T, P) {
		applyFormat(state)(T, P)
	},
	// Inserts plaintext, HTML, or GitHub Flavored Markdown on
	// the current range. mimeType can be "text/plaintext",
	// "text/html", or "text/gfm".
	insertText(data, mimeType) {
		// insertText(state)(data, mimeType)
	},
	// Handler for uncontrolled input events. Note that
	// uncontrolled events cannot be prevented; most events
	// are controlled.
	uncontrolledInputHandler(spans, collapsed) {
		// TODO
		const element = state.elements.find(each => each.key === collapsed[0].key)
		element.props.spans.splice(0, element.props.spans.length, ...spans)
		this.select(collapsed)
		this.render()
	},
	// Deletes a boundary (in a direction) on the current
	// range. dir can be "rtl" or "ltr" and boundary can be
	// "word", "word", or "line". Note that emojis are
	// expected to be deleted as graphemes.
	delete(dir, boundary) {
		$delete(state)(dir, boundary)
	},
	// Cuts the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	cut() {
		// TODO
	},
	// Copies the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	copy() {
		// TODO
	},
	// Pastes plaintext, HTML, or GitHub Flavored Markdown on
	// the current range. mimeType can be "text/plaintext",
	// "text/html", or "text/gfm".
	paste(mimeType) {
		// TODO
	},
	// Pushes an undo state onto the history state stack.
	pushUndoState(undoState) {
		// TODO
	},
	// Undos the history state stack once.
	undo() {
		// TODO
	},
	// Redos the history state stack once.
	redo() {
		// TODO
	},
	// TODO: Add comment
	render() {
		state.shouldRender++
	},
})

export default methods
