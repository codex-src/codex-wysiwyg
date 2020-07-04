// import internalDelete from "./internalDelete"
import * as Range from "../Range"
import internalApplyFormat from "./internalApplyFormat"
import JSONClone from "lib/JSONClone"
import queryCollection from "./queryCollection"

// Locks the editor; disables future edits. Unlike blur,
// lock is expected to remove the DOM attribute
// contenteditable from the DOM tree.
export const lock = state => () => {
	state.locked = true
}

// Unlocks the editor; enables future edits. Unlike focus,
// unlock is expected to add the DOM attribute
// contenteditable to the DOM tree.
export const unlock = state => () => {
	state.locked = false
}

// Focuses the editor. When the editor is focused, editing
// operations **are** expected to work.
export const focus = state => () => {
	state.focused = true
}

// Blurs the editor. When the editor is blurred, editing
// operations **are not** expected to work.
export const blur = state => () => {
	state.focused = false
}

// Selects a range. Note that the current range persists
// even when the editor is locked or blurred.
export const select = state => range => {
	state.range = range
}

// Applies a format to the current range.
export const applyFormat = state => (T, P) => {
	internalApplyFormat(state)(T, P)
}

// Inserts plaintext, HTML, or GitHub Flavored Markdown on
// the current range. mimeType can be "text/plaintext",
// "text/html", or "text/gfm".
export const insertText = state => (data, mimeType) => {
	// insertText(state)(data, mimeType)
}

// Handler for uncontrolled input events. Note that
// uncontrolled events cannot be prevented; most events are
// controlled.
export const uncontrolledInputHandler = state => (spans, collapsed) => {
	const element = state.elements.find(each => each.key === collapsed[0].key)
	element.props.spans.splice(0, element.props.spans.length, ...spans)
	select(state)(collapsed)
	render(state)()
}

// Backspaces on the current range by one rune. Note that
// emojis are expected to be backspaced only once.
export const backspaceRune = state => () => {
	// backspaceRune(state)()

	// State.queryCollection(state)()
	const collection = queryCollection(state)()
	// console.log(collection)

	// TODO: Remove empty elements
	for (const c of collection) {
		for (const s of c.spans) {
			const x = c.ref.props.spans.indexOf(s) // TODO: Add throw?
			c.ref.props.spans.splice(x, 1)
		}
	}

	// TODO: Forward-delete is effectively the same but we
	// swap out the order of collection[0] and
	// collection[collection.length - 1]
	if (collection.length > 1) {
		const x1 = state.elements.indexOf(collection[0].ref) // TODO: Add throw?
		const x2 = state.elements.indexOf(collection[collection.length - 1].ref) // TODO: Add throw?
		state.elements.splice(x1, (x2 - x1) + 1, {
			...collection[0].ref,
			props: {
				...collection[0].ref.props,
				spans: [...collection[0].ref.props.spans, ...collection[collection.length - 1].ref.props.spans],
			},
		})
		console.log(JSONClone(state.elements))

		// for (const c of collection.slice(1)) { // TODO: Reverse order?
		// 	if (!c.ref.props.spans.length) {
		// 		const x = state.elements.indexOf(c.ref) // TODO: Add throw?
		// 		state.elements.splice(x, 1)
		// 	}
		// }
		// collection[0].ref.props.spans.push(...collection.slice(-1)[0].ref.props.spans)
	}

	// state.range[1] = state.range[0]
	const collapsed = Range.collapse(state.range)
	select(state)(collapsed)
	render(state)()
}

// Deletes a boundary on the current range. dir can be "rtl"
// or "ltr" and boundary can be "word", "word", or "line".
export const $delete = state => (dir, boundary) => {
	// internalDelete(state)(dir, boundary)
}

// // Cuts the current range as plaintext, HTML, and GitHub
// // Flavored Markdown to the editor clipboard.
// const cut = state => () => {
// 	// cut(state)()
// }
//
// // Copies the current range as plaintext, HTML, and GitHub
// // Flavored Markdown to the editor clipboard.
// const copy = state => () => {
// 	// copy(state)()
// }
//
// // Pastes plaintext, HTML, or GitHub Flavored Markdown on
// // the current range. mimeType can be "text/plaintext",
// // "text/html", or "text/gfm".
// const paste = state => mimeType => {
// 	// paste(state)()
// }
//
// // Pushes an undo state onto the history state stack.
// const pushUndoState = state => undoState => {
// 	// pushUndoState(state)(undoState)
// }
//
// // Undos the editor history state stack once.
// const undo = state => () => {
// 	// undo(state)()
// }
//
// // Redos the editor history state stack once.
// const redo = state => () => {
// 	// redo(state)()
// }

// Schedules the editor for an immediate rerender.
export const render = state => () => {
	state.shouldRerender++
}
