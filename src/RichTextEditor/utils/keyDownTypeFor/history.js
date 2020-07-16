import isCtrlOrMetaKey from "lib/Client/isCtrlOrMetaKey"
import keyCodeFor from "lib/Client/keyCodeFor"
import userAgent from "lib/Client/userAgent"

const history = {
	undo(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("Z")
		)
		return ok
	},
	redo(e) {
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("Y")
			)
			return ok
		} else {
			const ok = (
				e.shiftKey &&
				e.metaKey &&
				e.keyCode === keyCodeFor("Z")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default history
