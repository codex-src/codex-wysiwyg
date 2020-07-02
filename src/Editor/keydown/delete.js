import AAPL from "./AAPL"
import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const $delete = {
	rune(e) {
		// Both non-macOS and macOS:
		if (e.keyCode === keyCodes.Delete) {
			return true
		}
		if (AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === keyCodes.D
			)
			return ok
		}
		return false
	},
	word(e) {
		if (AAPL) {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodes.Delete
			)
			return ok
		}
		return false
	},
}

export default $delete
