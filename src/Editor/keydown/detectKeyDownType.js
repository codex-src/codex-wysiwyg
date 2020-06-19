import isMetaOrControlKey from "lib/isMetaOrControlKey"
import keyDownTypesEnum from "./keyDownTypesEnum"

const keyCodes = {
	Tab: 9,
	Enter: 13,

	I: 73, // Em
	B: 66, // Strong
	// TODO

	Backspace: 8,
	Delete: 46,
	D: 68, // Delete -- macOS

	Y: 89, // Undo
	Z: 90, // Redo
}

const detect = {
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
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.I
		)
		return ok
	},
	formatStrong(e) {
		const ok = (
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.B
		)
		return ok
	},
	// NOTE: detect.backspace* methods are ordered by
	// precedence.
	backspaceLine(e) {
		const ok = (
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Backspace
		)
		return ok
	},
	backspaceWord(e) {
		const ok = (
			e.altKey &&
			e.keyCode === keyCodes.Backspace
		)
		return ok
	},
	backspaceRune(e) {
		return e.keyCode === keyCodes.Backspace
	},
	// NOTE: detect.forwardBackspace* methods are ordered by
	// precedence.
	forwardBackspaceWordMacOS(e) {
		if (navigator.userAgent.indexOf("Mac OS X") >= 0) {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodes.Delete
			)
			return ok
		}
		return false
	},
	forwardBackspaceRune(e) {
		return e.keyCode === keyCodes.Delete
	},
	forwardBackspaceRuneMacOS(e) {
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
			!e.altKey &&
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Z
		)
		return ok
	},
	redoMacOS(e) {
		const ok = (
			e.shiftKey &&
			!e.altKey &&
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Z
		)
		return ok
	},
	redoOther(e) {
		const ok = (
			!e.shiftKey &&
			!e.altKey &&
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Y
		)
		return ok
	},
	// Character data must use a non-macro, non-command e.key;
	// most macros and commands are more than one rune.
	characterData(e) {
		const ok = (
			!isMetaOrControlKey(e) &&
			[...e.key].length === 1
		)
		return ok
	},
	characterDataDead(e) {
		return e.key === "Dead"
	},
}

// Detects a key down type.
function detectKeyDownType(e) {
	switch (true) {

	case detect.tab(e):
		return keyDownTypesEnum.tab
	case detect.enter(e):
		return keyDownTypesEnum.enter

	case detect.formatEm(e):
		return keyDownTypesEnum.formatEm
	case detect.formatStrong(e):
		return keyDownTypesEnum.formatStrong

	// NOTE: detect.backspace* methods are ordered by
	// precedence.
	case detect.backspaceLine(e):
		return keyDownTypesEnum.backspaceLine
	case detect.backspaceWord(e):
		return keyDownTypesEnum.backspaceWord
	case detect.backspaceRune(e):
		return keyDownTypesEnum.backspaceRune

	// NOTE: detect.forwardBackspace* methods are ordered by
	// precedence.
	case detect.forwardBackspaceWordMacOS(e):
		return keyDownTypesEnum.forwardBackspaceWord
	case detect.forwardBackspaceRune(e):
	case detect.forwardBackspaceRuneMacOS(e):
		return keyDownTypesEnum.forwardBackspaceRune

	case detect.undo(e):
		return keyDownTypesEnum.undo
	case detect.redoMacOS(e):
	case detect.redoOther(e):
		return keyDownTypesEnum.redo

	case detect.characterData(e):
		return keyDownTypesEnum.characterData
	case detect.characterDataDead(e):
		return keyDownTypesEnum.characterDataDead

	default:
		// No-op
		break
	}
	return ""
}

export default detectKeyDownType
