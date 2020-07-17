import testKeyDown from "lib/Client/testKeyDown"

const applyFormatMarkdown = {
	em(e) {
		return testKeyDown(e)
			.forShift()
			.forKey("_")
			.check()
	},
	strong(e) {
		return testKeyDown(e)
			.forShift()
			.forKey("*")
			.check()
	},
	code(e) {
		return testKeyDown(e)
			.forKey("`")
			.check()
	},
	strike(e) {
		return testKeyDown(e)
			.forShift()
			.forKey("~")
			.check()
	},
	a(e) {
		return testKeyDown(e).forKey("[").check() || testKeyDown(e).forKey("]").check()
	},
}

export default applyFormatMarkdown
