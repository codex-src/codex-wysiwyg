import useMethods from "use-methods"

// NOTE: The following imports are intentionally not sorted.
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
	nativeInputHandler,
} from "./insert"

import {
	deleteRTLRune,
	deleteRTLWord,
	deleteRTLLine,
	deleteLTRRune,
	deleteLTRWord,
} from "./delete-dir"

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
	// Applies <em> formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyEm() {
		applyEm(state)()
	},
	// Applies <strong> formatting to the current range. If
	// the current range is already formatted as such, said
	// formatting is expected to be removed.
	applyStrong() {
		applyStrong(state)()
	},
	// Applies <code> formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyCode() {
		applyCode(state)()
	},
	// Applies <strike> formatting to the current range. If
	// the current range is already formatted as such, said
	// formatting is expected to be removed.
	applyStrike() {
		applyStrike(state)()
	},
	// Applies <a> formatting to the current range. If the
	// current range is already formatted as such, said
	// formatting is expected to be removed.
	applyA(href) {
		applyA(state)(href)
	},
	// Inserts data of a MIME-type at the current range.
	// mimeType can be "text/plaintext", "text/html", or
	// "text/gfm".
	insert(data, mimeType) {
		insert(state)(data, mimeType)
	}
	// Handler for native input events. Note that native input
	// events cannot be prevented.
	nativeInputHandler() {
		nativeInputHandler(state)()
	}
	// Deletes right-to-left (RTL) on the current range by one
	// rune. RTL deletes are also known as backspace.
	deleteRTLRune() {
		deleteRTLRune(state)()
	},
	// Deletes right-to-left (RTL) on the current range by one
	// word. RTL deletes are also known as backspace.
	deleteRTLWord() {
		deleteRTLWord(state)()
	},
	// Deletes right-to-left (RTL) on the current range by one
	// line. RTL deletes are also known as backspace.
	deleteRTLLine() {
		deleteRTLLine(state)()
	},
	// Deletes left-to-right (LTR) on the current range by one
	// rune.
	deleteLTRRune() {
		deleteLTRRune(state)()
	},
	// Deletes left-to-right (LTR) on the current range by one
	// word.
	deleteLTRWord() {
		deleteLTRWord(state)()
	},
	// Cuts the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	cut() {
		cut(state)()
	}
	// Copies the current range as plaintext, HTML, and GitHub
	// Flavored Markdown to the editor clipboard.
	copy() {
		copy(state)()
	},
	// Pastes data of a MIME-type at the current range.
	// mimeType can be "text/plaintext", "text/html", or
	// "text/gfm".
	paste(mimeType) {
		paste(state)()
	},
	// Pushes an undo state onto the history state stack.
	pushUndoState(undoState) {
		pushUndoState(state)(undoState)
	},
	// Undos the editor state once.
	undo() {
		undo(state)()
	},
	// Redos the editor state once.
	redo() {
		redo(state)()
	},
})

const init = ({ markup, children }) => ({
	// ....
})

function useEditor({ markup, children }) {
	// const ...
	// return ...
}

export default useEditor
