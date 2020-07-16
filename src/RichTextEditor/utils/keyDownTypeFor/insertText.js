import keyCodeFor from "lib/Client/keyCodeFor"
import testKeyDown from "lib/Client/testKeyDown"

// Returns the UTF-8 decoded rune count.
function runeCount(str) {
	return [...str].length
}

const insertText = {
	insertText(e) {
		// const ok = (
		// 	!e.ctrlKey && // Non-command or macro
		// 	!e.metaKey && // Non-command or macro
		// 	runeCount(e.key) === 1
		// )
		// return ok

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
