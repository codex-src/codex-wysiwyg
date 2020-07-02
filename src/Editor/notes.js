import useMethods from "use-methods"

// NOTE: Imports are intentionally unsorted.
import {
	lock,
	unlock,
} from "./lock"

import {
	focus,
	blur,
	select,
} from "./focus"

import {
	applyPlaintext,
	applyEm,
	applyStrong,
	applyCode,
	applyStrike,
	applyA,
} from "./apply-inline"

import {
	insert,
	uncontrolledInputHandler,
} from "./insert"

import {
	backspaceByRune,
	backspaceByWord,
	backspaceByLine,
	deleteByRune,
	deleteByWord,
} from "./backspace-delete"

import {
	cut,
	copy,
	paste,
} from "./clipboard"

import {
	pushUndoState,
	undo,
	redo,
} from "./history"

// TODO: applyBlockFormat*
const dispatch = state => ({
	// Locks the editor; prevents future edits. Unlike blur,
	// lock is expected to remove the DOM attribute
	// contenteditable from the DOM tree.
	lock() {
		lock(state)()
	},
	// Unlocks the editor; enables future edits. Unlike focus,
	// unlock is expected to add the DOM attribute
	// contenteditable to the DOM tree.
	unlock() {
		unlock(state)()
	},
	// Focuses the editor; enables future edits. For example,
	// when the editor is focused, undo and redo **are**
	// expected to work.
	focus() {
		focus(state)()
	},
	// Blurs the editor; prevents future edits. For example,
	// when the editor is blurred, undo and redo **are not**
	// expected to work.
	blur() {
		blur(state)()
	},
	// Selects a range. Note that lock and blur are not
	// expected to remove the current range from the editor
	// internally.
	select(range) {
		select(state)(range)
	},
	// Applies plaintext formatting to the current range.
	applyPlaintext() {
		applyPlaintext(state)()
	},
	// Applies emphasis formatting to the current range. If
	// the current range is already formatted as such, said
	// formatting is expected to be removed.
	applyEm() {
		applyEm(state)()
	},
	// Applies strong formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyStrong() {
		applyStrong(state)()
	},
	// Applies code formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyCode() {
		applyCode(state)()
	},
	// Applies strikethrough formatting to the current range.
	// If the current range is already formatted as such, said
	// formatting is expected to be removed.
	applyStrike() {
		applyStrike(state)()
	},
	// Applies anchor formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyA(href) {
		applyA(state)(href)
	},
	// Inserts plaintext, HTML, or GitHub Flavored Markdown at
	// the current range. mimeType can be "text/plaintext",
	// "text/html", or "text/gfm".
	insert(data, mimeType) {
		insert(state)(data, mimeType)
	},
	// Handler for uncontrolled input events. Uncontrolled
	// means the event cannot be prevented.
	uncontrolledInputHandler() {
		uncontrolledInputHandler(state)()
	},
	// Backspaces (deletes right-to-left) on the current range
	// by one rune.
	backspaceByRune() {
		backspaceByRune(state)()
	},
	// Backspaces (deletes right-to-left) on the current range
	// by one word.
	backspaceByWord() {
		backspaceByWord(state)()
	},
	// Backspaces (deletes right-to-left) on the current range
	// by one line.
	backspaceByLine() {
		backspaceByLine(state)()
	},
	// Deletes (deletes left-to-right) on the current range by
	// one rune.
	deleteByRune() {
		deleteByRune(state)()
	},
	// Deletes (deletes left-to-right) on the current range by
	// one word.
	deleteByWord() {
		deleteByWord(state)()
	},
	// Cuts the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	cut() {
		cut(state)()
	},
	// Copies the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	copy() {
		copy(state)()
	},
	// Pastes plaintext, HTML, or GitHub Flavored Markdown at
	// the current range. mimeType can be "text/plaintext",
	// "text/html", or "text/gfm".
	paste(mimeType) {
		paste(state)()
	},
	// Pushes an undo state onto the history state stack.
	pushUndoState(undoState) {
		pushUndoState(state)(undoState)
	},
	// Undos the editor history state stack once.
	undo() {
		undo(state)()
	},
	// Redos the editor history state stack once.
	redo() {
		redo(state)()
	},
})

const init = ({ markup, children }) => ({
	// ....
})

function useEditor({ markup, children }) {
	// ...
}

export default useEditor
