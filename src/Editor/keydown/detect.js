import enumerated from "./enumerated"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"

const keyCodes = {
	Dead: 229,

	Tab: 9,
	Enter: 13,

	I: 73, // <em>
	B: 66, // <strong>
	// <code>
	// <strike>
	// <a>

	Backspace: 8,
	Delete: 46,
	D: 68, // macOS

	Y: 89, // Non-macOS Undo
	Z: 90, // Redo
}

// FIXME: Windows uses ctrl-backspace and ctrl-delete to
// backspace and delete a word
const detectors = {
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
	// NOTE: detectors.backspaceRTL* methods are ordered by
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
	// NOTE: detectors.backspaceLTR* methods are ordered by
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
	redoNonMacOS(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			!e.altKey &&
			e.keyCode === keyCodes.Y
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
}

// Detects a key down type.
function detect(e) {
	switch (true) {

	case detectors.characterData(e):
		return enumerated.characterData
	case detectors.characterDataDead(e):
		return enumerated.characterDataDead

	case detectors.tab(e):
		return enumerated.tab
	case detectors.enter(e):
		return enumerated.enter

	case detectors.formatEm(e):
		return enumerated.formatEm
	case detectors.formatStrong(e):
		return enumerated.formatStrong

	// NOTE: detectors.backspaceRTL* methods are ordered by
	// precedence.
	case detectors.backspaceRTLLine(e):
		return enumerated.backspaceRTLLine
	case detectors.backspaceRTLWord(e):
		return enumerated.backspaceRTLWord
	case detectors.backspaceRTLRune(e):
		return enumerated.backspaceRTLRune

	// NOTE: detectors.backspaceLTR* methods are ordered by
	// precedence.
	case detectors.backspaceLTRWordMacOS(e):
		return enumerated.backspaceLTRWord
	case detectors.backspaceLTRRune(e):
	case detectors.backspaceLTRRuneMacOS(e):
		return enumerated.backspaceLTRRune

	case detectors.undo(e):
		return enumerated.undo
	case detectors.redoNonMacOS(e):
	case detectors.redoMacOS(e):
		return enumerated.redo

	default:
		// No-op
		break
	}
	return ""
}

export default detect
