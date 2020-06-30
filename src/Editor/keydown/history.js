import AAPL from "./AAPL"
import isCtrlOrMetaKey from "./isCtrlOrMetaKey"
import keyCodes from "./keyCodes"

const history = {
	undo(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodes.Z
		)
		return ok
	},
	redo(e) {
		if (!AAPL) {
			const ok = (
				isCtrlOrMetaKey(e) &&
				e.keyCode === keyCodes.Y
			)
			return ok
		} else {
			const ok = (
				e.shiftKey &&
				isCtrlOrMetaKey(e) &&
				e.keyCode === keyCodes.Z
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default history
