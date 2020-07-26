import * as actions from "./actions"
import hash from "lib/x/hash"
import React from "react"
import { initElementsFromMarkup } from "../parsers"
import { useImmerReducer } from "use-immer"

const newInitialState = () => ({
	lastActionTimestamp: "",
	lastAction: 0,
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
	applyType: null,
	shouldRerender: 0,
})

// // Records the current action. No-ops "SELECT" actions
// // sooner than 200ms.
// function record(e, actionType) {
// 	const now = Date.now()
// 	if (actionType === "SELECT" && now - e.lastActionTimestamp < 200) {
// 		// No-op
// 		return
// 	}
// 	e.lastActionTimestamp = now
// 	e.lastAction = actionType
// }

function reducer(e, action) {
	switch (action.type) {
	case "MANUALLY_UPDATE_ELEMENTS":
		// record(e, action.type)
		actions.manuallyUpdateElements(e, action)
		return
	case "FOCUS":
		// record(e, action.type)
		actions.focus(e, action)
		return
	case "BLUR":
		// record(e, action.type)
		actions.blur(e, action)
		return
	case "SELECT":
		// record(e, action.type)
		actions.select(e, action)
		return
	case "INSERT_TEXT":
		// record(e, action.type)
		actions.insertText(e, action)
		return
	case "APPLY_FORMAT":
		// record(e, action.type)
		actions.applyFormat(e, action)
		return
	case "INSERT_HARD_PARAGRAPH":
		// record(e, action.type)
		actions.insertHardParagraph(e, action)
		return
	case "DELETE":
		// record(e, action.type)
		actions.$delete(e, action)
		return
	case "UNCONTROLLED_INPUT":
		// record(e, action.type)
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
