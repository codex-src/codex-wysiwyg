import getKeyCode from "lib/getKeyCode"

// Returns the UTF-8 decoded rune count.
function runeCount(str) {
	return [...str].length
}

// Tests a keydown event for insert-text hotkeys.
const insertText = {
	tab(e) {
		const ok = (
			!e.ctrlKey && // Negates browser shortcuts (ctrl-tab and shift-ctrl-tab)
			e.keyCode === getKeyCode("Tab")
		)
		return ok
	},
	enter(e) {
		return e.keyCode === getKeyCode("Enter")
	},
	insertText(e) {
		const ok = (
			!e.ctrlKey &&
			!e.metaKey &&
			runeCount(e.key) === 1
		)
		return ok
	},
}

export default insertText
