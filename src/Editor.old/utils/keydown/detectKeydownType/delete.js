import keyCodeFor from "../keyCodeFor"
import userAgent from "lib/userAgent"

// NOTE: Backspace and delete methods are tested in reverse-
// order because of precedence.
const $delete = {
	rune(e) {
		if (!userAgent.isAAPL) {
			const ok = (
				e.keyCode === keyCodeFor("Delete")
			)
			return ok
		} else {
			const ok = (
				e.keyCode === keyCodeFor("Delete") ||
				(e.ctrlKey && e.keyCode === keyCodeFor("D"))
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
	word(e) {
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("Delete")
			)
			return ok
		} else {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodeFor("Delete")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default $delete
