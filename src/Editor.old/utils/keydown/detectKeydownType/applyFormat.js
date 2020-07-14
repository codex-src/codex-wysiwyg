import isCtrlOrMetaKey from "../isCtrlOrMetaKey"
import keyCodeFor from "../keyCodeFor"

// https://slack.com/intl/en-kr/help/articles/201374536-Slack-keyboard-shortcuts#format-messages
const applyFormat = {
	plaintext(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("P")
		)
		return ok
	},
	em(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("I")
		)
		return ok
	},
	strong(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("B")
		)
		return ok
	},
	code(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("C")
		)
		return ok
	},
	strike(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("X")
		)
		return ok
	},
	a(e) {
		const ok = (
			!e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === keyCodeFor("K")
		)
		return ok
	},
}

export default applyFormat
