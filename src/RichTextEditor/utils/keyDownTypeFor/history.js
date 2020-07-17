import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"
import userAgent from "lib/Client/userAgent"

const history = {
	undo(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("Z"))
	},
	redo(e) {
		if (!userAgent.isAAPL) {
			return testKeyDown(e)
				.forCtrl()
				.forKeyCode(keyCodeFor("Y"))
		} else {
			return testKeyDown(e)
				.forShift()
				.forMeta()
				.forKeyCode(keyCodeFor("Z"))
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default history
