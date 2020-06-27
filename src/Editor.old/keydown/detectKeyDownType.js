import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"
import keyDownTypesEnum from "./keyDownTypesEnum"

const keyCodes = {
	Dead: 229,

	Tab: 9,
	Enter: 13,

	I: 73, // Em
	B: 66, // Strong

	// // TODO
	// "formatCode":   "formatCode",
	// "formatStrike": "formatStrike",
	// "formatA":      "formatA",

	Backspace: 8,
	Delete: 46,
	D: 68, // macOS

	Y: 89, // Undo (other)
	Z: 90, // Redo
}

const detect = {
	// Character data must use a non-macro, non-command e.key;
	// most macros and commands are more than one rune.
	characterData(e) {
		const ok = (
			// !isCtrlOrMetaKey(e) &&
			!e.ctrlKey && // Non-macro
			!e.metaKey && // Non-command
			[...e.key].length === 1
		)
		return ok
	},
	characterDataDead(e) {
		return e.keyCode === keyCodes.Dead
	},
	tab(e) {
		const ok = (
			!e.ctrlKey && // Negates browser shortcuts (ctrl-tab and shift-ctrl-tab)
			e.keyCode === keyCodes.Tab
		)
		return ok
	},
	enter(e) {
		return e.keyCode === keyCodes.Enter
	},
	formatEm(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.I
		)
		return ok
	},
	formatStrong(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.B
		)
		return ok
	},
	// NOTE: detect.backspaceRTL* methods are ordered by
	// precedence.
	backspaceRTLLine(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.Backspace
		)
		return ok
	},
	backspaceRTLWord(e) {
		const ok = (
			e.altKey &&
			e.keyCode === keyCodes.Backspace
		)
		return ok
	},
	backspaceRTLRune(e) {
		return e.keyCode === keyCodes.Backspace
	},
	// NOTE: detect.backspaceLTR* methods are ordered by
	// precedence.
	backspaceLTRWordMacOS(e) {
		if (navigator.userAgent.indexOf("Mac OS X") >= 0) {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodes.Delete
			)
			return ok
		}
		return false
	},
	backspaceLTRRune(e) {
		return e.keyCode === keyCodes.Delete
	},
	backspaceLTRRuneMacOS(e) {
		if (navigator.userAgent.indexOf("Mac OS X") >= 0) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodes.D
			)
			return ok
		}
		return false
	},
	undo(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			!e.altKey &&
			e.keyCode === keyCodes.Z
		)
		return ok
	},
	redoMacOS(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			!e.altKey &&
			e.keyCode === keyCodes.Z
		)
		return ok
	},
	redoOther(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			!e.altKey &&
			e.keyCode === keyCodes.Y
		)
		return ok
	},
}

// Detects a key down type.
function detectKeyDownType(e) {
	switch (true) {

	case detect.characterData(e):
		return keyDownTypesEnum.characterData
	case detect.characterDataDead(e):
		return keyDownTypesEnum.characterDataDead

	case detect.tab(e):
		return keyDownTypesEnum.tab
	case detect.enter(e):
		return keyDownTypesEnum.enter

	case detect.formatEm(e):
		return keyDownTypesEnum.formatEm
	case detect.formatStrong(e):
		return keyDownTypesEnum.formatStrong

	// NOTE: detect.backspaceRTL* methods are ordered by
	// precedence.
	case detect.backspaceRTLLine(e):
		return keyDownTypesEnum.backspaceRTLLine
	case detect.backspaceRTLWord(e):
		return keyDownTypesEnum.backspaceRTLWord
	case detect.backspaceRTLRune(e):
		return keyDownTypesEnum.backspaceRTLRune

	// NOTE: detect.backspaceLTR* methods are ordered by
	// precedence.
	case detect.backspaceLTRWordMacOS(e):
		return keyDownTypesEnum.backspaceLTRWord
	case detect.backspaceLTRRune(e):
	case detect.backspaceLTRRuneMacOS(e):
		return keyDownTypesEnum.backspaceLTRRune

	case detect.undo(e):
		return keyDownTypesEnum.undo
	case detect.redoMacOS(e):
	case detect.redoOther(e):
		return keyDownTypesEnum.redo

	default:
		// No-op
		break
	}
	return ""
}

export default detectKeyDownType
