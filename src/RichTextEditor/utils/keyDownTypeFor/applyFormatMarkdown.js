const applyFormatMarkdown = {
	em(e) {
		return e.key === "_"
	},
	strong(e) {
		return e.key === "*"
	},
	code(e) {
		return e.key === "`"
	},
	strike(e) {
		return e.key === "~"
	},
	a(e) {
		const ok = (
			e.key === "[" ||
			e.key === "]"
		)
		return ok
	},
}

export default applyFormatMarkdown
