import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

const history = {
	undo(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("Z"))
			.check()
	},
	redoNonMacOS(e) {
		return testKeyDown(e)
			.forCtrl()
			.forKeyCode(keyCodeFor("Y"))
			.check()
	},
	redoMacOS(e) {
		return testKeyDown(e)
			.forShift()
			.forMeta()
			.forKeyCode(keyCodeFor("Z"))
			.check()
	},
}

export default history
