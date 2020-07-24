import * as actions from "./actions/actions" // FIXME: Use index.js?
import parseElements from "./parseElements"
import React from "react"
import { useImmerReducer } from "use-immer"

const createInitialState = elements => ({
	lastActionTimestamp: "init",
	lastAction: Date.now(),
	focused: false,
	elements,
	range: {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
	},
	shouldRerender: 0,
})

function reducer(draft, action) {
	switch (action.type) {
	case "FOCUS":
		actions.focus(draft)()
		return
	case "BLUR":
		actions.blur(draft)()
		return
	case "SELECT":
		actions.select(draft)(action.range)
		return
	case "INSERT_TEXT":
		actions.insertText(draft)(action.keyDownType)
		return
	case "APPLY_FORMAT":
		actions.applyFormat(draft)(action.keyDownType)
		return
	case "DELETE":
		actions.$delete(draft)(action.keyDownType)
		return
	case "UNCONTROLLED_INPUT":
		actions.uncontrolledInput(draft)(action.children, action.range)
		return
	default:
		throw new Error(`useEditor.reducer: no such action.type; action.type=${action.type}`)
	}
}

// Instantiates from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup })
		return createInitialState(elements)
	}, [markup])
	return useImmerReducer(reducer, initialState)
}

// Instantiates from React children. Note that children is
// expected to be an array of React elements.
export function useEditorFromChildren(children) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ children })
		return createInitialState(elements)
	}, [children])
	return useImmerReducer(reducer, initialState)
}
