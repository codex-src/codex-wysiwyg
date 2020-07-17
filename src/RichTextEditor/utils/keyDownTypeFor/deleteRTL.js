import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"
import userAgent from "lib/Client/userAgent"

const deleteRTL = {
	rune(e) {
		if (testKeyDown(e).forShift({ passthrough: true }).forKeyCode(keyCodeFor("Backspace")).check()) {
			return true
		}
		if (userAgent.isAAPL) {
			return testKeyDown(e)
				.forShift({ passthrough: true })
				.forCtrl({ passthrough: true })
				.forKeyCode(keyCodeFor("Backspace"))
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
				.forKeyCode(keyCodeFor("Backspace"))
				.check()
		} else {
			return testKeyDown(e)
				.forShift({ passthrough: true })
				.forCtrl({ passthrough: true }) // Edge case
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
				.forShift({ passthrough: true })
				.forMeta()
				.forKeyCode(keyCodeFor("Backspace"))
				.check()
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default deleteRTL
