import useMethods from "use-methods"

const methods = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
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
		startCursor: {
			elementIndex: 0,
			characterOffset: 0,
		},
		endCursor: {
			elementIndex: 0,
			characterOffset: 0,
		},
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
