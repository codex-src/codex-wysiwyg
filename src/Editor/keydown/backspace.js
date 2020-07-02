import AAPL from "./AAPL"
import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const backspace = {
	rune(e) {
		return e.keyCode === keyCodes.Backspace
	},
	word(e) {
		if (!AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === keyCodes.Backspace
			)
			return ok
		} else {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodes.Backspace
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
				e.keyCode === keyCodes.Backspace
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default backspace
