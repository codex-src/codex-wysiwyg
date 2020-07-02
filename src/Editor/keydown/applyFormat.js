import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const applyFormat = {
	plaintext(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.P
		)
		return ok
	},
	em(e) {
		if (e.key === "_") {
			return true
		}
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.I
		)
		return ok
	},
	strong(e) {
		if (e.key === "*") {
			return true
		}
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.B
		)
		return ok
	},
	code(e) {
		if (e.key === "`") {
			return true
		}
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.C
		)
		return ok
	},
	strike(e) {
		if (e.key === "~") {
			return true
		}
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.X
		)
		return ok
	},
	a(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.K
		)
		return ok
	},
}

export default applyFormat
