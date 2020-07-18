import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

const deleteRTL = {
	runeAny(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
	runeMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forCtrl({ passthrough: true })
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
	wordNonMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forCtrl()
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
	wordMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forCtrl({ passthrough: true }) // Edge case
			.forAlt()
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
	lineMacOS(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forMeta()
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
}

export default deleteRTL
