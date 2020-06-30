import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const format = {
	em(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.I
		)
		return ok
	},
	strong(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.B
		)
		return ok
	},
	code(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.C
		)
		return ok
	},
	strike(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.X
		)
		return ok
	},
	a(e) {
		const ok = ( // TODO: Untested
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.K
		)
		return ok
	},
}

export default format
