import isCtrlOrMetaKey from "../isCtrlOrMetaKey"
import keyCodeFor from "../keyCodeFor"
import userAgent from "lib/userAgent"

const history = {
	undo(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("z")
		)
		return ok
	},
	redo(e) {
		// Non-macOS:
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("y")
			)
			return ok
		// macOS:
		} else {
			const ok = (
				e.shiftKey &&
				e.metaKey &&
				e.keyCode === keyCodeFor("z")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default history
