import * as actions from "./actions"
import hash from "lib/x/hash"
import React from "react"
import { initElementsFromMarkup } from "../parsers"
import { useImmerReducer } from "use-immer"

const newInitialState = () => ({
	mounted: false,
	focused: false,
	elements: [
		{
			type: "p",
			key: hash(),
			props: {
				children: [],
			},
		},
	],
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
	rangeTypes: {},
	shouldRerender: 0,
})

function EditorReducer(e, action) {
	switch (action.type) {
	case "MOUNT":
		actions.mount(e, action)
		return
	case "FOCUS":
		actions.focus(e, action)
		return
	case "BLUR":
		actions.blur(e, action)
		return
	case "SELECT":
		actions.select(e, action)
		return
	case "INSERT_TEXT":
		actions.insertText(e, action)
		return
	// case "INSERT_TEXT_COMPOSED_ON_SELECTION":
	// 	actions.insertTextComposedOnSelection(e, action)
	// 	return
	case "APPLY_TYPES":
		actions.addOrRemoveTypes(e, action)
		return
	case "INSERT_HARD_PARAGRAPH":
		actions.insertHardParagraph(e, action)
		return
	case "DELETE":
		actions.$delete(e, action)
		return
	case "UNCONTROLLED_INPUT":
		actions.uncontrolledInput(e, action)
		return
	default:
		throw new Error(`useEditor.EditorReducer: type mismatch; action.type=${action.type}`)
	}
}

// Instantiates an editor from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = initElementsFromMarkup(markup)
		return newInitialState(elements)
	}, [markup])
	return useImmerReducer(EditorReducer, initialState)
}

// Instantiates an editor.
export function useEditor() {
	const initialState = React.useMemo(newInitialState)
	return useImmerReducer(EditorReducer, initialState)
}
