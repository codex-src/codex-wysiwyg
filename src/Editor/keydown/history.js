import AAPL from "lib/AAPL"
import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"

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
		if (!AAPL) {
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
