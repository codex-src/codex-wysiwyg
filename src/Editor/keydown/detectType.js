import backspace from "./backspace"
import characterData from "./characterData"
import enumerated from "./enumerated"
import formatting from "./formatting"
import history from "./history"

// Detects a keydown enum type.
function detectType(e) {
	switch (true) {

	case formatting.plaintext(e):
		return enumerated.formatPlaintext
	case formatting.em(e):
		return enumerated.formatEm
	case formatting.strong(e):
		return enumerated.formatStrong
	case formatting.strike(e):
		return enumerated.formatStrike
	case formatting.code(e):
		return enumerated.formatCode
	case formatting.a(e):
		return enumerated.formatA

	case characterData.tab(e):
		return enumerated.tab
	case characterData.enter(e):
		return enumerated.enter
	case characterData.characterData(e):
		return enumerated.characterData
	case characterData.dead(e):
		return enumerated.characterDataDead

	case backspace.RTL.line(e): // Takes precedence
		return enumerated.backspaceRTLLine
	case backspace.RTL.word(e): // Takes precedence
		return enumerated.backspaceRTLWord
	case backspace.RTL.rune(e):
		return enumerated.backspaceRTLRune

	case backspace.LTR.word(e): // Takes precedence
		return enumerated.backspaceLTRWord
	case backspace.LTR.rune(e): // Takes precedence
		return enumerated.backspaceLTRRune

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