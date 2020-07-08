import * as Readers from "../Readers"
import decorate from "../decorate"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import VirtualRange from "../model/VirtualRange"
import { useImmerReducer } from "use-immer"

// Disables read-only mode; enables future edits.
function DISABLE_READ_ONLY_MODE(draft) {
	const closure = () => {
		draft.readOnlyModeEnabled = false
	}
	return closure
}

// Enables read-only mode; disables future edits.
function ENABLE_READ_ONLY_MODE(draft) {
	const closure = () => {
		draft.readOnlyModeEnabled = true
	}
	return closure
}

// Focuses the editor. When the editor is focused, editing
// operations **are** expected to work.
function FOCUS(draft) {
	const closure = () => {
		draft.focused = true
	}
	return closure
}

// Blurs the editor. When the editor is blurred, editing
// operations **are not** expected to work.
function BLUR(draft) {
	const closure = () => {
		draft.focused = false
	}
	return closure
}

// Selects a virtual range.
function SELECT(draft) {
	const closure = range => {
		draft.range = range
	}
	return closure
}

// useEditor reducer.
function reducer(draft, action) {
	switch (action.type) {
	case "DISABLE_READ_ONLY_MODE":
		DISABLE_READ_ONLY_MODE(draft)()
		return
	case "ENABLE_READ_ONLY_MODE":
		ENABLE_READ_ONLY_MODE(draft)()
		return
	case "FOCUS":
		FOCUS(draft)()
		return
	case "BLUR":
		BLUR(draft)()
		return
	case "SELECT":
		SELECT(draft)(action.range)
		return
	default:
		throw new Error(`useEditor.reducer: type mismatch; type=${action.type}`)
	}
}

// DOMContentLoaded: false,
// readOnlyModeEnabled: false,
// elements,
// focused: false,
// range: {
// 	0: {
// 		key: "",
// 		offset: 0,
// 	},
// 	1: {
// 		key: "",
// 		offset: 0,
// 	},
// 	collapsed: true,
// },
// shouldRender: 0,

// Return a stateful editor initializer.
//
// TODO: Create an immerable class?
const init = initialState => () => ({
	// Read-only mode and focused states.
	readOnlyModeEnabled: true,
	focused: false,
	// Elements and range.
	elements: initialState,
	range: new VirtualRange(),
	// Etc.
	shouldRender: 0,
})

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

	return useImmerReducer(reducer, null, init(initialState))
}

export default useEditor
