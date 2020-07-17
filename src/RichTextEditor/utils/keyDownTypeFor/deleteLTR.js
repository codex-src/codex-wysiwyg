import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"
import userAgent from "lib/Client/userAgent"

const deleteLTR = {
	rune(e) {
		if (testKeyDown(e).forKeyCode(keyCodeFor("Delete")).check()) {
			return true
		}
		if (userAgent.isAAPL) {
			return testKeyDown(e)
				.forCtrl()
				.forKeyCode(keyCodeFor("D"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
	word(e) {
		if (!userAgent.isAAPL) {
			return testKeyDown(e)
				.forCtrl()
				.forKeyCode(keyCodeFor("Delete"))
				.check()
		} else {
			return testKeyDown(e)
				.forAlt()
				.forKeyCode(keyCodeFor("Delete"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default deleteLTR
