import * as actions from "./actions/actions" // FIXME
import parseElements from "./parseElements"
import React from "react"
import { useImmerReducer } from "use-immer"

const createInitialState = elements => ({
	lastActionTimestamp: "init",
	lastAction: Date.now(),
	readOnlyModeEnabled: true, // DOMContentLoaded disables read-only mode
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
		collapsed() {
			const ok = (
				this.start === this.end ||
				(this.start.key === this.end.key && this.start.offset === this.end.offset)
			)
			return ok
		},
	},
	shouldRerender: 0,
})

function reducer(draft, action) {
	switch (action.type) {
	case "ENABLE_READ_ONLY_MODE":
		actions.enableReadOnlyMode(draft)()
		return
	case "DISABLE_READ_ONLY_MODE":
		actions.disableReadOnlyMode(draft)()
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
