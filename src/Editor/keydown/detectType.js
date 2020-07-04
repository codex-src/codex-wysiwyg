import $delete from "./delete"
import applyFormat from "./applyFormat"
import enumerated from "./enumerated"
import history from "./history"
import insertText from "./insertText"

// Detects a keydown type.
function detectType(e) {
	switch (true) {

	case applyFormat.plaintext(e):
		return enumerated.applyFormatPlaintext
	case applyFormat.em(e):
		return enumerated.applyFormatEm
	case applyFormat.strong(e):
		return enumerated.applyFormatStrong
	case applyFormat.code(e):
		return enumerated.applyFormatCode
	case applyFormat.strike(e):
		return enumerated.applyFormatStrike
	case applyFormat.a(e):
		return enumerated.applyFormatA

	case insertText.tab(e):
		return enumerated.insertTextTab
	case insertText.enter(e):
		return enumerated.insertTextEnter
	case insertText.insertText(e):
		return enumerated.insertText

	case $delete.rtl.line(e): // Takes precedence
		return enumerated.deleteRTLLine
	case $delete.rtl.word(e): // Takes precedence
		return enumerated.deleteRTLWord
	case $delete.rtl.rune(e):
		return enumerated.deleteRTLRune
	case $delete.ltr.word(e): // Takes precedence
		return enumerated.deleteLTRWord
	case $delete.ltr.rune(e):
		return enumerated.deleteLTRRune

	case history.undo(e):
		return enumerated.undo
	case history.redo(e):
		return enumerated.redo

	default:
		// No-op
		break
	}
	return ""
}

export default detectType
