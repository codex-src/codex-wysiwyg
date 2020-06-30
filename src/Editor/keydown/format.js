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
		const ok = ( // TODO
			false
			// ...
		)
		return ok
	},
	strike(e) {
		const ok = ( // TODO
			false
			// ...
		)
		return ok
	},
	a(e) {
		const ok = ( // TODO
			false
			// ...
		)
		return ok
	},
}

export default format
