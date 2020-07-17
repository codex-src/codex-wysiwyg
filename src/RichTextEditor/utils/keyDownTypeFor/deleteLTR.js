import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"
import userAgent from "lib/Client/userAgent"

const deleteLTR = {
	rune(e) {
		if (testKeyDown(e).forShift({ passthrough: true }).forKeyCode(keyCodeFor("Delete")).check()) {
			return true
		}
		if (userAgent.isAAPL) {
			return testKeyDown(e)
				// .forShift({ passthrough: true }) // Edge case (commented out)
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
				.forShift({ passthrough: true })
				.forCtrl()
				.forKeyCode(keyCodeFor("Delete"))
				.check()
		} else {
			return testKeyDown(e)
				.forShift({ passthrough: true })
				.forAlt()
				.forKeyCode(keyCodeFor("Delete"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default deleteLTR
