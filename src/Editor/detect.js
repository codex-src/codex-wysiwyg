import isMetaOrControlKey from "lib/isMetaOrControlKey"
import keyDownTypesEnum from "./keyDownTypesEnum"

const keyCodes = {
	I: 73, // Emphasis
	B: 66, // Strong
	// TODO

	Tab: 9,
	Enter: 13,

	Backspace: 8,
	Delete: 46,
	D: 68, // Delete -- macOS

	Y: 89, // Undo
	Z: 90, // Redo
}

const detect = {
	formatEmphasis(e) {
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
	tab(e) {
		const ok = (
			!e.ctrlKey && // Negates control-tab and shift-control-tab shortcuts
			e.keyCode === keyCodes.Tab
		)
		return ok
	},
	enter(e) {
		return e.keyCode === keyCodes.Enter
	},
	// NOTE: detect.backspace* are ordered by precedence
	backspaceParagraph(e) {
		const ok = (
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Backspace
		)
		return ok
	},
	// TODO: Do non-macOS systems support backspace word?
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
	// NOTE: detect.forwardBackspace* are ordered by
	// precedence
	forwardBackspaceWord(e) {
		// macOS:
		const ok = (
			navigator.userAgent.indexOf("Mac OS X") !== -1 &&
			e.altKey &&
			e.keyCode === keyCodes.Delete
		)
		return ok
	},
	forwardBackspaceRune(e) {
		return e.keyCode === keyCodes.Delete
	},
	forwardBackspaceRuneMacOS(e) {
		const ok = (
			navigator.userAgent.indexOf("Mac OS X") !== -1 &&
			e.ctrlKey &&
			e.keyCode === keyCodes.D
		)
		return ok
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
	redoNonMacOS(e) {
		const ok = (
			!e.shiftKey &&
			!e.altKey &&
			isMetaOrControlKey(e) &&
			e.keyCode === keyCodes.Y
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
	// Character data must be a non-command e.key
	// (such as "Enter").
	characterData(e) {
		const ok = (
			!isMetaOrControlKey(e) &&
			[...e.key].length === 1
		)
		return ok
	},
	// characterDataCompose(e) {
	// 	return e.key === "Dead"
	// },
}

// Detects a key down type.
function detectKeyDownType(e) {
	switch (true) {
	case detect.formatEmphasis(e):
		return keyDownTypesEnum.formatEmphasis
	case detect.formatStrong(e):
		return keyDownTypesEnum.formatStrong
	case detect.tab(e):
		return keyDownTypesEnum.tab
	case detect.enter(e):
		return keyDownTypesEnum.enter
	// NOTE: detect.backspace* are ordered by precedence
	case detect.backspaceParagraph(e):
		return keyDownTypesEnum.backspaceParagraph
	case detect.backspaceWord(e):
		return keyDownTypesEnum.backspaceWord
	case detect.backspaceRune(e):
		return keyDownTypesEnum.backspaceRune
	// NOTE: detect.forwardBackspace* are ordered by
	// precedence
	case detect.forwardBackspaceWord(e):
		return keyDownTypesEnum.forwardBackspaceWord
	case detect.forwardBackspaceRune(e):
	case detect.forwardBackspaceRuneMacOS(e):
		return keyDownTypesEnum.forwardBackspaceRune
	case detect.undo(e):
		return keyDownTypesEnum.undo
	case detect.redoNonMacOS(e):
	case detect.redoMacOS(e):
		return keyDownTypesEnum.redo
	case detect.characterData(e):
	// case detect.characterDataCompose(e):
		return keyDownTypesEnum.characterData
	default:
		// No-op
		break
	}
	return ""
}

export default detectKeyDownType
