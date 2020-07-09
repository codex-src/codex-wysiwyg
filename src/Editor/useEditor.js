import Editor from "./model/Editor"
import React from "react"

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

function useEditor(serializedHTML) {
	const initialState = React.useMemo(() => {
		return new Editor(serializedHTML)
	}, [serializedHTML])
	return React.useReducer(EditorReducer, initialState)
}

export default useEditor
