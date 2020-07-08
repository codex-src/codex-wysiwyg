import isCtrlOrMetaKey from "../isCtrlOrMetaKey"
import keyCodeFor from "../keyCodeFor"

const applyFormat = {
	plaintext(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("p")
		)
		return ok
	},
	em(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("i")
		)
		return ok
	},
	strong(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("b")
		)
		return ok
	},
	// https://slack.com/intl/en-kr/help/articles/201374536-Slack-keyboard-shortcuts#format-messages
	code(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("c")
		)
		return ok
	},
	// https://slack.com/intl/en-kr/help/articles/201374536-Slack-keyboard-shortcuts#format-messages
	strike(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("x")
		)
		return ok
	},
	a(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("k")
		)
		return ok
	},
}

export default applyFormat
