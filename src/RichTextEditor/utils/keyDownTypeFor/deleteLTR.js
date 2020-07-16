import keyCodeFor from "lib/Client/keyCodeFor"
import userAgent from "lib/Client/userAgent"

const deleteLTR = {
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

export default deleteLTR
