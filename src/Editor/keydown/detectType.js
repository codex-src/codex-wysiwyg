import $delete from "./delete"
import applyFormat from "./applyFormat"
import backspace from "./backspace"
import enumerated from "./enumerated"
import history from "./history"
import insertText from "./insertText"

// Detects a keydown enum type.
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

	// case insertText.dead(e):
	// 	return enumerated.characterDataDead

	case backspace.line(e): // Takes precedence
		return enumerated.backspaceLine
	case backspace.word(e): // Takes precedence
		return enumerated.backspaceWord
	case backspace.rune(e):
		return enumerated.backspaceRune

	case $delete.word(e): // Takes precedence
		return enumerated.deleteWord
	case $delete.rune(e):
		return enumerated.deleteRune

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
