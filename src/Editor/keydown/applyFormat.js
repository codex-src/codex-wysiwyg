import getKeyCode from "lib/getKeyCode"
import isCtrlOrMetaKey from "lib/isCtrlOrMetaKey"

const applyFormat = {
	plaintext(e) {
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("P")
		)
		return ok
	},
	em(e) {
		if (e.key === "_") {
			return true
		}
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("I")
		)
		return ok
	},
	strong(e) {
		if (e.key === "*") {
			return true
		}
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("B")
		)
		return ok
	},
	code(e) {
		if (e.key === "`") {
			return true
		}
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("C")
		)
		return ok
	},
	strike(e) {
		if (e.key === "~") {
			return true
		}
		const ok = (
			e.shiftKey &&
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("X")
		)
		return ok
	},
	a(e) {
		const ok = (
			isCtrlOrMetaKey(e) &&
			e.keyCode === getKeyCode("K")
		)
		return ok
	},
}

export default applyFormat
