import parseElements from "./parseElements"
import React from "react"
import reducer from "./reducer"
import { useImmerReducer } from "use-immer"

const newInitialState = elements => ({
	lastActionTimestamp: "init",
	lastAction: Date.now(),
	readOnlyModeEnabled: true, // DOMContentLoaded disables read-only mode
	focused: false,
	elements,
	finalElements: null,
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

// Instantiates from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup })
		return newInitialState(elements)
	}, [markup])
	return useImmerReducer(reducer, initialState)
}

// Instantiates from React children. Note that children is
// expected to be an array of React elements.
export function useEditorFromChildren(children) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ children })
		return newInitialState(elements)
	}, [children])
	return useImmerReducer(reducer, initialState)
}
