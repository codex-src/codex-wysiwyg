import keyCodeFor from "../keyCodeFor"

const applyFormatMarkdown = {
	plaintext(e) {
		const ok = (
			!e.shiftKey &&
			e.keyCode === keyCodeFor("\\")
		)
		return ok
	},
	em(e) {
		const ok = (
			e.shiftKey &&
			e.keyCode === keyCodeFor("_")
		)
		return ok
	},
	strong(e) {
		const ok = (
			e.shiftKey &&
			e.keyCode === keyCodeFor("*")
		)
		return ok
	},
	code(e) {
		const ok = (
			!e.shiftKey &&
			e.keyCode === keyCodeFor("`")
		)
		return ok
	},
	strike(e) {
		const ok = (
			e.shiftKey &&
			e.keyCode === keyCodeFor("~")
		)
		return ok
	},
	a(e) {
		const ok = (
			(!e.shiftKey && e.keyCode === keyCodeFor("[")) ||
			(!e.shiftKey && e.keyCode === keyCodeFor("]"))
		)
		return ok
	},
}

export default applyFormatMarkdown
