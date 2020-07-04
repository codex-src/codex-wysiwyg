import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"
import userAgent from "lib/userAgent"

// Tests a keydown event for backspace hotkeys.
const backspace = {
	rune(e) {
		return e.keyCode === getKeyCode("Backspace")
	},
	word(e) {
		if (!userAgent.AAPL) {
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
		if (userAgent.AAPL) {
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
