import isCtrlOrMetaKey from "lib/Client/isCtrlOrMetaKey"
import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

// https://slack.com/intl/en-kr/help/articles/201374536-Slack-keyboard-shortcuts#format-messages
const applyFormat = {
	plaintext(e) {
		return testKeyDown(e)
			.forShift()
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("P"))
			.check()
	},
	em(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("I"))
			.check()
	},
	strong(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("B"))
			.check()
	},
	code(e) {
		return testKeyDown(e)
			.forShift()
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("C"))
			.check()
	},
	strike(e) {
		return testKeyDown(e)
			.forShift()
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("X"))
			.check()
	},
	a(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("K"))
			.check()
	},
}

export default applyFormat
