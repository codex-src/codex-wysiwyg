import keyCodes from "./keyCodes"

// Returns the UTF-8 decoded rune count.
function runeCount(str) {
	return [...str].length
}

const insertText = {
	tab(e) {
		const ok = (
			!e.ctrlKey && // Negates browser shortcuts (ctrl-tab and shift-ctrl-tab)
			e.keyCode === keyCodes.Tab
		)
		return ok
	},
	enter(e) {
		return e.keyCode === keyCodes.Enter
	},
	insertText(e) {
		const ok = (
			!e.ctrlKey &&
			!e.metaKey &&
			runeCount(e.key) === 1
		)
		return ok
	},
	// dead(e) {
	// 	return e.keyCode === keyCodes.Dead
	// },
}

export default insertText
