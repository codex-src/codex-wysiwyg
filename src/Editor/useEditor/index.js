import * as Range from "../Range"
import * as Readers from "../Readers"
import * as Types from "../Types"
import decorate from "../decorate"
import JSONClone from "lib/JSONClone"
import markupToDOMTree from "lib/markupToDOMTree"
import queryCollection from "./queryCollection"
import React from "react"
import ReactDOMServer from "react-dom/server"
import useMethods from "use-methods"

// Locks the editor; disables future edits. Unlike blur,
// lock is expected to remove the DOM attribute
// contenteditable from the DOM tree.
const lock = state => () => {
	state.locked = true
}

// Unlocks the editor; enables future edits. Unlike focus,
// unlock is expected to add the DOM attribute
// contenteditable to the DOM tree.
const unlock = state => () => {
	state.locked = false
}

// Focuses the editor. When the editor is focused, editing
// operations **are** expected to work.
const focus = state => () => {
	state.focused = true
}

// Blurs the editor. When the editor is blurred, editing
// operations **are not** expected to work.
const blur = state => () => {
	state.focused = false
}

// Selects a range. Note that the current range persists
// even when the editor is locked or blurred.
const select = state => range => {
	state.range = range
}

// Applies formatting to the current range.
const applyFormatPlaintext = state => () => {
	applyFormat(state)("plaintext")
}

// Applies formatting to the current range. Formatting is
// toggled when previously applied.
const applyFormatEm = state => () => {
	applyFormat(state)(Types.enum.em)
}

// Applies formatting to the current range. Formatting is
// toggled when previously applied.
const applyFormatStrong = state => () => {
	applyFormat(state)(Types.enum.strong)
}

// Applies formatting to the current range. Formatting is
// toggled when previously applied.
const applyFormatCode = state => () => {
	applyFormat(state)(Types.enum.code)
}

// Applies formatting to the current range. Formatting is
// toggled when previously applied.
const applyFormatStrike = state => () => {
	applyFormat(state)(Types.enum.strike)
}

// Applies formatting to the current range. Formatting is
// toggled when previously applied.
const applyFormatA = state => href => {
	applyFormat(state)(Types.enum.a, { href })
}

// Inserts plaintext, HTML, or GitHub Flavored Markdown on
// the current range. mimeType can be "text/plaintext",
// "text/html", or "text/gfm".
//
// TODO: Redo comment
const insertText = state => (data, mimeType) => {
	// insertText(state)(data, mimeType)
}

// Handler for uncontrolled input events. Note that
// uncontrolled events cannot be prevented; most events are
// controlled.
const uncontrolledInputHandler = state => (spans, collapsed) => {
	const element = state.elements.find(each => each.key === collapsed[0].key)
	element.props.spans.splice(0, element.props.spans.length, ...spans)
	select(state)(collapsed)
	render(state)()
}

// Backspaces on the current range by one rune. Note that
// emojis are expected to be backspaced only once.
const backspaceRune = state => () => {
	// backspaceRune(state)()

	const collection = queryCollection(state)
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

// Backspaces on the current range by one word.
const backspaceWord = state => () => {
	// backspaceWord(state)()
}

// Backspaces on the current range by one line (paragraph).
const backspaceLine = state => () => {
	// backspaceLine(state)()
}

// Deletes on the current range by one rune. Note that
// emojis are expected to be deleted only once.
const deleteRune = state => () => {
	// deleteRune(state)()
}

// Deletes on the current range by one word.
const deleteWord = state => () => {
	// deleteWord(state)()
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
const render = state => () => {
	state.shouldRerender++
}

// Applies a format to a collection.
const applyFormat = state => (T, P = {}) => {
	const collection = queryCollection(state)

	// Tests what to do:
	const shouldApply = T === "plaintext" ? -1
		: Number(!collection.every(each => each.spans.every(each => each.types.indexOf(T) >= 0)))

	if (shouldApply === -1) {
		for (const c of collection) {
			for (const s of c.spans) {
				for (const T of s.types) {
					s[T] = undefined
				}
				s.types.splice(0)
			}
			c.spans.map(each => Types.sort(each))
		}
	} else if (shouldApply === 0) {
		for (const c of collection) {
			for (const s of c.spans) {
				const x = s.types.indexOf(T)
				if (x >= 0) {
					s.types.splice(x, 1)
					s[T] = undefined
				}
			}
			c.spans.map(each => Types.sort(each))
		}
	} else if (shouldApply === 1) {
		for (const c of collection) {
			for (const s of c.spans) {
				const x = s.types.indexOf(T)
				if (x === -1) {
					s.types.push(T)
					if (Object.keys(P).length) {
						s[T] = P
					}
				}
			}
			c.spans.map(each => Types.sort(each))
		}
	}

	render(state)()
}

// // TODO
// write(characterData) {
// 	if (!state.range.collapsed) {
// 		// TODO
// 		return
// 	}
// 	const element = state.elements.find(each => each.key === state.range[0].key)
// 	const offsets = span_offsets(element.props.spans, state.range[0].offset)
// 	const ref = element.props.spans[offsets[0]]
// 	ref.text = ref.text.slice(0, offsets[1]) + characterData + ref.text.slice(offsets[1])
// 	state.range[0].offset++
// 	const collapsed = Range.collapse(state.range)
// 	this.select(collapsed)
// 	render(state)()
// },
// input(spans, collapsed) {
// 	const element = state.elements.find(each => each.key === collapsed[0].key)
// 	element.props.spans = spans
// 	this.select(collapsed)
// 	render(state)()
// },

// TODO: Add findElementOrNode API or equivalent?
const methods = state => ({
	lock() {
		lock(state)()
	},
	unlock() {
		unlock(state)()
	},
	focus() {
		focus(state)()
	},
	blur() {
		blur(state)()
	},
	select(range) {
		select(state)(range)
	},
	applyFormatPlaintext() {
		applyFormatPlaintext(state)()
	},
	applyFormatEm() {
		applyFormatEm(state)()
	},
	applyFormatStrong() {
		applyFormatStrong(state)()
	},
	applyFormatCode() {
		applyFormatCode(state)()
	},
	applyFormatStrike() {
		applyFormatStrike(state)()
	},
	applyFormatA(href) {
		applyFormatA(state)(href)
	},
	insertText(data, mimeType) {
		insertText(state)(data, mimeType)
	},
	uncontrolledInputHandler(spans, collapsed) {
		uncontrolledInputHandler(state)(spans, collapsed)
	},
	backspaceRune() {
		backspaceRune(state)()
	},
	backspaceWord() {
		backspaceWord(state)()
	},
	backspaceLine() {
		backspaceLine(state)()
	},
	deleteRune() {
		deleteRune(state)()
	},
	deleteWord() {
		deleteWord(state)()
	},
	// cut() {
	// 	cut(state)()
	// },
	// copy() {
	// 	copy(state)()
	// },
	// paste(mimeType) {
	// 	paste(state)(mimeType)
	// },
	// pushUndoState(undoState) {
	// 	pushUndoState(state)(undoState)
	// },
	// undo() {
	// 	undo(state)()
	// },
	// redo() {
	// 	redo(state)()
	// },
	render() {
		render(state)()
	},
})

const init = elements => ({
	locked: false,
	elements,
	focused: false,
	range: {
		0: {
			key: "",
			offset: 0,
		},
		1: {
			key: "",
			offset: 0,
		},
		collapsed: true,
	},
	// history: {
	// 	stack: [],
	// 	index: 0,
	// },
	shouldRerender: 0,
})

function useEditor({ markup, children }) {
	const elements = React.useMemo(() => {
		if ((!markup && !children) || (markup && children)) {
			throw new Error("useEditor: FIXME")
		}
		let domTree = null
		if (markup !== undefined) {
			domTree = markupToDOMTree("<div>" + markup + "</div>")
		} else if (children !== undefined) {
			const markup = ReactDOMServer.renderToStaticMarkup(children) // Shadows markup
			domTree = markupToDOMTree("<div>" + markup + "</div>")
		}
		decorate(domTree)
		return Readers.semantic.elements(domTree)
	}, [markup, children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
