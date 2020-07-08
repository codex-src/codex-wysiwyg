import keyCodeFor from "../keyCodeFor"
import userAgent from "lib/userAgent"

// NOTE: Backspace and delete methods are tested in reverse
// order because of greediness.
const backspace = {
	rune(e) {
		return e.keyCode === keyCodeFor("Backspace")
	},
	word(e) {
		// Non-macOS:
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("Backspace")
			)
			return ok
		// macOS:
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
		// macOS-only:
		if (userAgent.isAAPL) {
			const ok = (
				e.metaKey &&
				e.keyCode === keyCodeFor("Backspace")
			)
			return ok
		}
		// eslint-disable-next-line no-unreachable
		return false
	},
}

export default backspace
