import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

const insertText = {
	insertText(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forAlt({ passthrough: true })
			.forKey([...e.key][0])
			.check()
	},
	insertTab(e) {
		return testKeyDown(e)
			.forShift({ passthrough: true })
			.forKeyCode(keyCodeFor("Tab"))
			.check()
	},
	insertSoftParagraph(e) {
		return testKeyDown(e)
			.forShift()
			.forKeyCode(keyCodeFor("Enter"))
			.check()
	},
	insertHardParagraph(e) {
		return testKeyDown(e)
			.forKeyCode(keyCodeFor("Enter"))
			.check()
	},
	insertHorizontalRule(e) {
		return testKeyDown(e)
			.forCtrlOrMeta()
			.forKeyCode(keyCodeFor("Enter"))
			.check()
	}
}

export default insertText
