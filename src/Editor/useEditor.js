import Editor from "./model/Editor/Editor"
import parseTree from "lib/parseTree"
import React from "react"
import SemanticScanner from "./model/Scanners/SemanticScanner"
import stripWhiteSpace from "./utils/stripWhiteSpace"

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

function useEditor(html) {
	const initialState = React.useMemo(() => {
		const tree = parseTree(html, stripWhiteSpace)
		const scanner = new SemanticScanner()
		const elements = scanner.scan(tree)
		return new Editor(elements)
	}, [html])
	return React.useReducer(EditorReducer, initialState)
}

export default useEditor
