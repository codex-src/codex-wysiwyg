import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"
import userAgent from "lib/Client/userAgent"

const deleteRTL = {
	rune(e) {
		return testKeyDown(e)
			.forKeyCode(keyCodeFor("Backspace"))
			.check()
	},
	word(e) {
		if (!userAgent.isAAPL) {
			return testKeyDown(e)
				.forCtrl()
				.forKeyCode(keyCodeFor("Backspace"))
				.check()
		} else {
			return testKeyDown(e)
				.forAlt()
				.forKeyCode(keyCodeFor("Backspace"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
	line(e) {
		if (userAgent.isAAPL) {
			return testKeyDown(e)
				.forMeta()
				.forKeyCode(keyCodeFor("Backspace"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default deleteRTL
