import AAPL from "lib/AAPL"
import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"

const backspace = {
	rune(e) {
		return e.keyCode === getKeyCode("Backspace")
	},
	word(e) {
		if (!AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === getKeyCode("Backspace")
			)
			return ok
		} else {
			const ok = (
				e.altKey &&
				e.keyCode === getKeyCode("Backspace")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
	line(e) {
		if (AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === getKeyCode("Backspace")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default backspace
