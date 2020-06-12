import useMethods from "use-methods"
import { newCursor } from "./constructors"

const methods = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(startCursor, endCursor) {
		Object.assign(state, {
			startCursor,
			endCursor,
			collapsed: startCursor === endCursor,
		})
	},
	input(uuid, spans, ...cursors) {
		const element = state.elements.find(each => each.uuid === uuid)
		if (!element) {
			throw new Error("dispatch.input: no such element")
		}
		element.spans = spans
		this.select(...cursors)
	},

	// input(startCursor, endCursor) {
	// 	const spans = readSpans(ref.current.children[0])
	// 	setState({
	// 		...state,
	// 		startCursor: {
	// 			...state.startCursor,
	// 			character: state.startCursor.character + 1,
	// 		},
	// 		endCursors: {
	// 			...state.startCursor,
	// 			character: state.startCursor.character + 1,
	// 		},
	// 		elements: [
	// 			{
	// 				...state.elements[0],
	// 				key: uuidv4(),
	// 				spans,
	// 			},
	// 		],
	// 	})
	// },
})

function init(initialState) {
	const state = {
		focused: false,
		startCursor: newCursor(),
		endCursor: newCursor(),
		collapsed: true,
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
