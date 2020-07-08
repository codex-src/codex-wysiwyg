import * as Readers from "../Readers"
import decorate from "../decorate"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import VirtualRange from "../model/VirtualRange"

import {
	immerable,
	produce,
} from "immer"

class Editor {
	[immerable] = true

	readOnlyModeEnabled = true // DOMContentLoaded disables read-only mode
	focused = false

	elements = [] // new VirtualElements()
	range = new VirtualRange()

	renderCount = 0

	constructor(initialState /* elements */) {
		Object.assign(this, {
			elements: initialState,
		})
	}

	// Disables read-only mode; disables future edits.
	disableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = false
		})
	}
	// Enables read-only mode; enables future edits.
	enableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = true
		})
	}
	// Focuses the editor.
	focus() {
		return produce(this, draft => {
			draft.focused = true
		})
	}
	// Blurs the editor.
	blur() {
		return produce(this, draft => {
			draft.focused = false
		})
	}
	// Selects a virtual range.
	select(range) {
		return produce(this, draft => {
			draft.range = range
		})
	}
}

function EditorReducer(state, action) {
	switch (action.type) {
	case "DISABLE_READ_ONLY_MODE":
		return state.disableReadOnlyMode()
	case "ENABLE_READ_ONLY_MODE":
		return state.enableReadOnlyMode()
	case "FOCUS":
		return state.focus()
	case "BLUR":
		return state.blur()
	case "SELECT":
		return state.select(action.range)
	default:
		throw new Error(`useEditor.EditorReducer: type mismatch; action.type=${action.type}`)
	}
}

function useEditor({ markup, children }) {
	// TODO
	const initialState = React.useMemo(() => {
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

	return React.useReducer(EditorReducer, null, () => new Editor(initialState))
}

export default useEditor
