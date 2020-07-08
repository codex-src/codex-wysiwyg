import keyCodeFor from "../keyCodeFor"
import userAgent from "lib/userAgent"

// NOTE: Backspace and delete methods are tested in reverse
// order because of greediness.
const $delete = {
	rune(e) {
		const ok = (
			e.keyCode === keyCodeFor("Delete") || // Any
			(userAgent.isAAPL && e.ctrlKey && e.keyCode === keyCodeFor("d")) // macOS-only
		)
		return ok
	},
	word(e) {
		// Non-macOS:
		if (!userAgent.isAAPL) {
			const ok = (
				e.ctrlKey &&
				e.keyCode === keyCodeFor("Delete")
			)
			return ok
		// macOS:
		} else if (userAgent.isAAPL) {
			const ok = (
				e.altKey &&
				e.keyCode === keyCodeFor("Delete")
			)
			return ok
		}
		return false
	},
}

export default $delete
