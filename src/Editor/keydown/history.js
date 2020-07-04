import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"
import userAgent from "lib/userAgent"

// Tests a keydown event for history hotkeys.
const history = {
	undo(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("Z")
		)
		return ok
	},
	redo(e) {
		if (!userAgent.AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === getKeyCode("Y")
			)
			return ok
		} else {
			const ok = (
				e.shiftKey &&
				isCtrlOrMetaKey(e) &&
				e.keyCode === getKeyCode("Z")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default history
