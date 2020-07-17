import keyCodeFor from "lib/Client/keyCodeFor"
import userAgent from "lib/Client/userAgent"

// TODO
const deleteRTL = {
	rune(e) {
		const ok = (
			e.keyCode === keyCodeFor("Backspace")
		)
		return ok
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

export default deleteRTL
