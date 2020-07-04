import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"
import userAgent from "lib/userAgent"

const $delete = {

	// Tests a keydown event for right-to-left delete hotkeys.
	rtl: {
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
	},

	// Tests a keydown event for left-to-right delete hotkeys.
	ltr: {
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
	},

}

export default $delete
