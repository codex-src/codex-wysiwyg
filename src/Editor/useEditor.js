import * as Range from "./Range"
import * as Readers from "./Readers"
import * as Types from "./Types"
import decorate from "./decorate"
import JSONClone from "lib/JSONClone"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import spanUtils from "./spanUtils"
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
const insert = state => (data, mimeType) => {
	// insert(state)(data, mimeType)
}

// Handler for uncontrolled input events. Note that
// uncontrolled events cannot be prevented; most events are
// controlled.
const uncontrolledInputHandler = state => () => {
	// uncontrolledInputHandler(state)()
}

// Backspaces on the current range by one rune. Note that
// emojis are expected to be backspaced only once.
const backspaceRune = state => () => {
	// backspaceRune(state)()
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

// Cuts the current range as plaintext, HTML, and GitHub
// Flavored Markdown to the editor clipboard.
const cut = state => () => {
	// cut(state)()
}

// Copies the current range as plaintext, HTML, and GitHub
// Flavored Markdown to the editor clipboard.
const copy = state => () => {
	// copy(state)()
}

// Pastes plaintext, HTML, or GitHub Flavored Markdown on
// the current range. mimeType can be "text/plaintext",
// "text/html", or "text/gfm".
const paste = state => mimeType => {
	// paste(state)()
}

// Pushes an undo state onto the history state stack.
const pushUndoState = state => undoState => {
	// pushUndoState(state)(undoState)
}

// Undos the editor history state stack once.
const undo = state => () => {
	// undo(state)()
}

// Redos the editor history state stack once.
const redo = state => () => {
	// redo(state)()
}

// Schedules the editor for an immediate rerender.
const render = state => () => {
	state.shouldRerender++
}

// ...

const applyFormat = state => (T, P = {}) => {
	// Returns the offset of an array of spans at an offset.
	const spanUtils_offset = spans => offset => {
		// Compute the span and text offsets:
		let x = 0
		for (; x < spans.length; x++) {
			if (offset - spans[x].text.length <= 0) {
				// No-op
				break
			}
			offset -= spans[x].text.length
		}
		// Return the current offset:
		if (!offset) {
			return x
		} else if (offset === spans[x].text.length) {
			return x + 1
		}
		// Cannot return the current offset; create new spans
		// and return the end offset:
		const start = {
			...JSONClone(spans[x]),
			text: spans[x].text.slice(0, offset),
		}
		const end = {
			...JSONClone(spans[x]),
			text: spans[x].text.slice(offset),
		}
		spans.splice(x, 1, start, end)
		return x + 1
	}

	// Gets the spans at the current range.
	const getCurrentRangeSpans = state => () => {
		// if (state.range.collapsed) {
		// 	return null
		// }

		const x1 = state.elements.findIndex(each => each.key === state.range[0].key)
		const x2 = state.range[0].key === state.range[1].key ? x1
			: state.elements.findIndex(each => each.key === state.range[1].key)

		const spans = []
		for (const each of state.elements.slice(x1, x2 + 1)) {
			if (each.key === state.range[0].key && each.key === state.range[1].key) {
				const x1 = spanUtils_offset(each.props.spans)(state.range[0].offset)
				const x2 = spanUtils_offset(each.props.spans)(state.range[1].offset)
				spans.push(...each.props.spans.slice(x1, x2))
				continue
			} else if (each.key === state.range[0].key) {
				const x = spanUtils_offset(each.props.spans)(state.range[0].offset)
				spans.push(...each.props.spans.slice(x))
				continue
			} else if (each.key === state.range[1].key) {
				const x = spanUtils_offset(each.props.spans)(state.range[1].offset)
				spans.push(...each.props.spans.slice(x))
				continue
			}
			spans.push(...each.props.spans)
		}
		return spans
	}

	// Get the current spans:
	const spans = getCurrentRangeSpans(state)()
	console.log(JSONClone(spans))
	if (!spans) {
		// No-op
		return
	}

	// Returns whether to format as plaintext (-1), remove
	// format T (0), or add format T (1).
	const shouldFormat = (() => {
		if (T === "plaintext") {
			return -1
		}
		const every = spans.every(each => each.types.indexOf(T) >= 0)
		return Number(!every)
	})()

	switch (shouldFormat) {
	case -1:
		for (const each of spans) {
			for (const T of each.types) {
				each[T] = undefined
			}
			each.types.splice(0)
		}
		break
	case 0:
		for (const each of spans) {
			const x = each.types.indexOf(T)
			if (x >= 0) {
				each.types.splice(x, 1)
			}
		}
		break
	case 1:
		for (const each of spans) {
			const x = each.types.indexOf(T)
			if (x === -1) {
				each.types.push(T)
			}
			if (Object.keys(P).length) {
				each[T] = P
			}
		}
		break
	default:
		// No-op
		break
	}

	// TODO: Change to spanUtils.defer
	spanUtils.sort(spans)
	render(state)()
}

// Returns the span and character offsets for a span and a
// range component offset.
function span_offsets(spans, offset) { // TODO
	let x = 0
	for (; x < spans.length; x++) {
		if (offset - spans[x].text.length <= 0) {
			return [x, offset]
		}
		offset -= spans[x].text.length
	}
	return null
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
// // TODO: Add support for nodes? elemUtils.find?
// input(spans, collapsed) {
// 	const element = state.elements.find(each => each.key === collapsed[0].key)
// 	element.props.spans = spans
// 	this.select(collapsed)
// 	render(state)()
// },

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
	insert(data, mimeType) {
		insert(state)(data, mimeType)
	},
	// TODO: Add spans, collapsed?
	uncontrolledInputHandler() {
		uncontrolledInputHandler(state)()
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
	// NOTE: Clipboard events may need to be processed in
	// their handler counterparts
	cut() {
		cut(state)()
	},
	copy() {
		copy(state)()
	},
	paste(mimeType) {
		paste(state)(mimeType)
	},
	pushUndoState(undoState) {
		pushUndoState(state)(undoState)
	},
	undo() {
		undo(state)()
	},
	redo() {
		redo(state)()
	},
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
	clipboard: { // TODO: Deprecate?
		"text/plaintext": "",
		"text/html": "",
		"text/gfm": "",
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
			throw new Error("useEditor: must use markup=string or children=React.ReactElement[]")
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
