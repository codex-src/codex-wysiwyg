import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

const deleteLTR = {
	runeAny(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forKeyCode(keyCodeFor("Delete"))
			.check()
	},
	runeMacOS(e) {
		return testKeyDown(e)
			.forCtrl()
			.forKeyCode(keyCodeFor("D"))
			.check()
	},
	wordNonMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forCtrl()
			.forKeyCode(keyCodeFor("Delete"))
			.check()
	},
	wordMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forAlt()
			.forKeyCode(keyCodeFor("Delete"))
			.check()
	},
}

export default deleteLTR
