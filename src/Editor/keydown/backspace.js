import AAPL from "./AAPL"
import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const backspace = {
	RTL: {
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
		rune(e) {
			return e.keyCode === keyCodes.Backspace
		},
	},
	LTR: {
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
	},
}

export default backspace
