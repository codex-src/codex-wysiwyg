import * as actions from "./actions"
import hash from "lib/x/hash"
import React from "react"
import { initElementsFromMarkup } from "../parsers"
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

// Records the current action. No-ops "SELECT" actions
// sooner than 200ms.
function record(e, actionType) {
	const now = Date.now()
	if (actionType === "SELECT" && now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = actionType
}

function reducer(e, action) {
	switch (action.type) {
	case "MANUALLY_UPDATE_ELEMENTS":
		record(e, action.type)
		actions.manuallyUpdateElements(e, action)
		return
	case "FOCUS":
		record(e, action.type)
		e.focused = true
		return
	case "BLUR":
		record(e, action.type)
		e.focused = false
		return
	case "SELECT":
		record(e, action.type)
		e.range = action.range
		return
	case "INSERT_TEXT":
		record(e, action.type)
		actions.insertText(e, action)
		return
	case "APPLY_FORMAT":
		record(e, action.type)
		actions.applyFormat(e, action)
		return
	case "DELETE":
		record(e, action.type)
		actions.$delete(e, action)
		return
	case "UNCONTROLLED_INPUT":
		record(e, action.type)
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
