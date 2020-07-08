import keyCodeFor from "../keyCodeFor"
import userAgent from "lib/userAgent"

// NOTE: Backspace and delete methods are tested in reverse-
// order because of precedence.
const backspace = {
	rune(e) {
		return e.keyCode === keyCodeFor("Backspace")
	},
	word(e) {
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("Backspace")
			)
			return ok
		} else {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodeFor("Backspace")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
	line(e) {
		if (userAgent.isAAPL) {
			const ok = (
				e.metaKey &&
				e.keyCode === keyCodeFor("Backspace")
			)
			return ok
		}
		return false
	},
}

export default backspace
