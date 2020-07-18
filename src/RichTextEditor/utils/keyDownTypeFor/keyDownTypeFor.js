import applyFormat from "./applyFormat"
import applyFormatMarkdown from "./applyFormatMarkdown"
import deleteLTR from "./deleteLTR"
import deleteRTL from "./deleteRTL"
import history from "./history"
import insertText from "./insertText"
import userAgent from "lib/Client/userAgent"

const macOS = userAgent.MacOSX

// Returns a keydown type for a keydown event.
function keyDownTypeFor(e) {
	switch (true) {
	case applyFormat.plaintext(e):
		return "apply-format-plaintext"
	case applyFormat.em(e):
		return "apply-format-em"
	case applyFormat.strong(e):
		return "apply-format-strong"
	case applyFormat.code(e):
		return "apply-format-code"
	case applyFormat.strike(e):
		return "apply-format-strike"
	case applyFormat.a(e):
		return "apply-format-a"
	case applyFormatMarkdown.em(e):
		return "apply-format-markdown-em"
	case applyFormatMarkdown.strong(e):
		return "apply-format-markdown-strong"
	case applyFormatMarkdown.code(e):
		return "apply-format-markdown-code"
	case applyFormatMarkdown.strike(e):
		return "apply-format-markdown-strike"
	case applyFormatMarkdown.a(e):
		return "apply-format-markdown-a"
	case insertText.insertText(e):
		return "insert-text"
	case insertText.insertTab(e):
		return "insert-tab"
	case insertText.insertSoftParagraph(e):
		return "insert-soft-paragraph"
	case insertText.insertHardParagraph(e):
		return "insert-hard-paragraph"
	case insertText.insertHorizontalRule(e):
		return "insert-horizontal-rule"
	case deleteRTL.runeAny(e):
	case macOS && deleteRTL.runeMacOS(e):
		return "delete-rtl-rune"
	case !macOS && deleteRTL.wordNonMacOS(e):
	case macOS && deleteRTL.wordMacOS(e):
		return "delete-rtl-word"
	case macOS && deleteRTL.lineMacOS(e):
		return "delete-rtl-line"
	case deleteLTR.runeAny(e):
	case macOS && deleteLTR.runeMacOS(e):
		return "delete-ltr-rune"
	case !macOS && deleteLTR.wordNonMacOS(e):
	case macOS && deleteLTR.wordMacOS(e):
		return "delete-ltr-word"
	case history.undo(e):
		return "undo"
	case !macOS && history.redoNonMacOS(e):
	case macOS && history.redoMacOS(e):
		return "redo"
	default:
		// No-op
		break
	}
	return ""
}

export default keyDownTypeFor
