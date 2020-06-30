import backspace from "./backspace"
import characterData from "./characterData"
import enumerated from "./enumerated"
import format from "./format"
import history from "./history"

// Detects a keydown enum type.
function detectType(e) {
	switch (true) {

	case characterData.tab(e):
		return enumerated.tab
	case characterData.enter(e):
		return enumerated.enter
	case characterData.characterData(e):
		return enumerated.characterData
	case characterData.dead(e):
		return enumerated.characterDataDead

	case format.em(e):
		return enumerated.formatEm
	case format.strong(e):
		return enumerated.formatStrong
	case format.strike(e):
		return enumerated.formatStrike
	case format.code(e):
		return enumerated.formatCode
	case format.a(e):
		return enumerated.formatA

	// NOTE: Ordered by precedence.
	case backspace.RTL.line(e):
		return enumerated.backspaceRTLLine
	case backspace.RTL.word(e):
		return enumerated.backspaceRTLWord
	case backspace.RTL.rune(e):
		return enumerated.backspaceRTLRune

	// NOTE: Ordered by precedence.
	case backspace.LTR.word(e):
		return enumerated.backspaceLTRWord
	case backspace.LTR.rune(e):
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
