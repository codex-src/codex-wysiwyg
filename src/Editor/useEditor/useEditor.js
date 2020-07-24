import * as actions from "./actions/actions" // FIXME: Use index.js?
import hash from "lib/x/hash"
import React from "react"
import { parseElementsFromMarkup } from "./parseElements"
import { useImmerReducer } from "use-immer"

function newInitialState() {
	const id = hash()
	const state = {
		lastActionTimestamp: "",
		lastAction: 0,
		focused: false,
		elements: [
			{
				type: "p",
				key: id,
				props: {
					children: [],
				},
			},
		],
		range: {
			start: {
				key: id,
				offset: 0,
			},
			end: {
				key: id,
				offset: 0,
			},
		},
		pendingRange: null,
		shouldRerender: 0,
	}
	return state
}

function reducer(draft, action) {
	switch (action.type) {
	case "MANUALLY_UPDATE_ELEMENTS":
		actions.manuallyUpdateElements(draft)(action.elements)
		return
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
		actions.insertText(draft)(action.key)
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

// Instantiates an editor from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = parseElementsFromMarkup(markup)
		return newInitialState(elements)
	}, [markup])
	return useImmerReducer(reducer, initialState)
}

// Instantiates an editor.
export function useEditor() {
	const initialState = React.useMemo(() => {
		return newInitialState()
	}, [])
	return useImmerReducer(reducer, initialState)
}
