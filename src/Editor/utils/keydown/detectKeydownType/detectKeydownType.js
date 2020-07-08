import $delete from "./delete"
import applyFormat from "./applyFormat"
import applyFormatMarkdown from "./applyFormatMarkdown"
import backspace from "./backspace"
import history from "./history"
import insertText from "./insertText"

// Detects a keydown type.
function detectKeydownType(e) {
	switch (true) {

	// TODO: Add "apply-format-plaintext-markdown", etc.?
	case applyFormat.plaintext(e):
	case applyFormatMarkdown.plaintext(e):
		return "apply-format-plaintext"
	case applyFormat.em(e):
	case applyFormatMarkdown.em(e):
		return "apply-format-em"
	case applyFormat.strong(e):
	case applyFormatMarkdown.strong(e):
		return "apply-format-strong"
	case applyFormat.code(e):
	case applyFormatMarkdown.code(e):
		return "apply-format-code"
	case applyFormat.strike(e):
	case applyFormatMarkdown.strike(e):
		return "apply-format-strike"
	case applyFormat.a(e):
	case applyFormatMarkdown.a(e):
		return "apply-format-a"

	case insertText.insertText(e):
		return "insert-text"
	case insertText.insertTab(e):
		return "insert-tab"
	case insertText.insertSoftParagraph(e):
		return "insert-soft-paragraph"
	case insertText.insertParagraph(e):
		return "insert-paragraph"

	case backspace.line(e): // Takes precedence
		return "backspace-line"
	case backspace.word(e): // Takes precedence
		return "backspace-word"
	case backspace.rune(e):
		return "backspace-rune"

	case $delete.word(e): // Takes precedence
		return "delete-word"
	case $delete.rune(e):
		return "delete-rune"

	case history.undo(e):
		return "undo"
	case history.redo(e):
		return "redo"

	default:
		// No-op
		break
	}
	return ""
}

export default detectKeydownType
