import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"
import userAgent from "lib/userAgent"

// Tests a keydown event for delete hotkeys.
const $delete = {
	rune(e) {
		if (e.keyCode === getKeyCode("Delete")) {
			return true
		}
		if (userAgent.AAPL) {
			const ok = (
				e.ctrlKey && // Do not use isCtrlOrMetaKey
				e.keyCode === getKeyCode("D")
			)
			return ok
		}
		return false
	},
	word(e) {
		if (userAgent.AAPL) {
			const ok = (
				e.altKey &&
				e.keyCode === getKeyCode("Delete")
			)
			return ok
		}
		return false
	},
}

export default $delete
