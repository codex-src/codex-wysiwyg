import * as Readers from "../Readers"
import decorate from "../decorate"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import useMethods from "use-methods"

// NOTE: Imports are intentionally unsorted.
import {
	lock,
	unlock,
	focus,
	blur,
	select,
	applyFormat,
	insertText,
	uncontrolledInputHandler,
	$delete,
	render,
} from "./implementation"

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
	applyFormat(T, P = {}) {
		applyFormat(state)(T, P)
	},
	insertText(data, mimeType) {
		insertText(state)(data, mimeType)
	},
	uncontrolledInputHandler(spans, collapsed) {
		uncontrolledInputHandler(state)(spans, collapsed)
	},
	delete(dir, boundary) {
		$delete(state)(dir, boundary)
	},

	// backspaceRune() {
	// 	backspaceRune(state)()
	// },
	// backspaceWord() {
	// 	backspaceWord(state)()
	// },
	// backspaceLine() {
	// 	backspaceLine(state)()
	// },
	// deleteRune() {
	// 	deleteRune(state)()
	// },
	// deleteWord() {
	// 	deleteWord(state)()
	// },

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
