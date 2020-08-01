import * as actions from "./actions"
import hash from "lib/x/hash"
import React from "react"
import { initElementsFromMarkup } from "../parsers"
import { useImmerReducer } from "use-immer"

const newInitialState = () => ({
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

function reducer(e, action) {
	switch (action.type) {
	case "MANUALLY_UPDATE_ELEMENTS":
		actions.manuallyUpdateElements(e, action)
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
	case "ADD_OR_REMOVE_TYPES":
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
		throw new Error(`useEditor.reducer: no such action.type; action.type=${action.type}`)
	}
}

// Instantiates an editor from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = initElementsFromMarkup(markup)
		return newInitialState(elements)
	}, [markup])
	return useImmerReducer(reducer, initialState)
}

// Instantiates an editor.
export function useEditor() {
	const initialState = React.useMemo(newInitialState)
	return useImmerReducer(reducer, initialState)
}
