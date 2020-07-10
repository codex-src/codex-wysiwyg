import Editor from "./model/Editor/Editor"
import parseTree from "lib/parseTree"
import React from "react"
import SemanticScanner from "./model/Scanners/SemanticScanner"
import stripWhiteSpace from "./utils/stripWhiteSpace"

// Parses elements from markup or children.
function parseElements({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useEditor.parseElements: use markup or props.children")
	}
	const elements = []
	if (markup) {
		const tree = parseTree(html, stripWhiteSpace)
		const scanner = new SemanticScanner()
		elements.push(...scanner.scan(tree))
	} else if (children) {
		const tree = renderTree(children)
		const scanner = new SemanticScanner()
		elements.push(...scanner.scan(tree))
	}
	return elements
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
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup, children })
		return new Editor(elements)
	}, [markup, children])
	return React.useReducer(EditorReducer, initialState)
}

export default useEditor
