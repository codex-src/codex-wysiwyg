import AAPL from "lib/AAPL"
import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"

const $delete = {
	rune(e) {
		// Both non-macOS and macOS:
		if (e.keyCode === getKeyCode("Delete")) {
			return true
		}
		if (AAPL) {
			const ok = (
				e.ctrlKey && // Do not use isCtrlOrMetaKey
				e.keyCode === getKeyCode("D")
			)
			return ok
		}
		return false
	},
	word(e) {
		if (AAPL) {
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
