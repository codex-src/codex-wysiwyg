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
	case "MOUNT_ELEMENTS":
		actions.mountElements(e, action.elements)
		return
	case "FOCUS":
		actions.focus(e, action)
		return
	case "BLUR":
		actions.blur(e, action)
		return
	case "SELECT":
		actions.select(e, action.range)
		return
	case "INSERT_TEXT":
		actions.insertText(e, action.text)
		return
	case "APPLY_TYPES":
		actions.applyTypes(e, action.types)
		return
	case "INSERT_HARD_PARAGRAPH":
		actions.insertHardParagraph(e, action)
		return
	case "DELETE":
		actions.$delete(e, action.deleteType)
		return
	case "UNCONTROLLED_INPUT":
		actions.uncontrolledInput(e, action.children, action.range, action.noopRender)
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
