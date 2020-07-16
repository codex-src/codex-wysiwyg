import keyCodeFor from "lib/Client/keyCodeFor"

// Returns the UTF-8 decoded rune count.
function runeCount(str) {
	return [...str].length
}

const insertText = {
	insertText(e) {
		const ok = (
			!e.ctrlKey && // Non-command or macro
			!e.metaKey && // Non-command or macro
			runeCount(e.key) === 1
		)
		return ok
	},
	insertTab(e) {
		const ok = (
			!e.ctrlKey && // Negates browser shortcuts
			!e.metaKey && // Negates operating system shortcuts
			e.keyCode === keyCodeFor("Tab")
		)
		return ok
	},
	insertSoftParagraph(e) {
		const ok = (
			e.shiftKey &&
			e.keyCode === keyCodeFor("Enter")
		)
		return ok
	},
	insertHardParagraph(e) {
		const ok = (
			!e.shiftKey &&
			e.keyCode === keyCodeFor("Enter")
		)
		return ok
	},
}

export default insertText
