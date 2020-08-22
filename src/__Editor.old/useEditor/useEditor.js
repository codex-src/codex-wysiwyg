import * as actions from "./actions"
import hash from "lib/x/hash"
import React from "react"
import { initElementsFromMarkup } from "../parsers"
import { useImmerReducer } from "use-immer"

const initialState = {
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
}

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

// Instantiates an editor state from markup.
export function useEditorFromMarkup(markup) {
	const state = React.useMemo(() => {
		const elements = initElementsFromMarkup(markup)
		const state = {
			...initialState,
			elements,
		}
		return state
	}, [markup])
	return useImmerReducer(EditorReducer, state)
}

// Instantiates an editor state.
export function useEditor() {
	return useImmerReducer(EditorReducer, initialState)
}
