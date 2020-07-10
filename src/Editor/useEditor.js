import Editor from "./model/Editor/Editor"
import parseTree from "lib/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import SemanticScanner from "./model/Scanners/SemanticScanner"
import stripWhiteSpace from "./utils/stripWhiteSpace"

// Parses elements from markup or children.
function parseElements({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useEditor.parseElements: use markup or props.children")
	}
	if (children) {
		markup = ReactDOMServer.renderToStaticMarkup(children)
	}
	const tree = parseTree("<article>" + markup.trim() + "</article>", stripWhiteSpace)
	const scanner = new SemanticScanner()
	return scanner.scan(tree)
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
