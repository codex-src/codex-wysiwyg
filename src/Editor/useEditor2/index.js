import VirtualRange from "../model/VirtualRange"
import { useImmerReducer } from "use-immer"

// Selects a virtual range.
function SELECT(draft) {
	const closure = range => {
		draft.range = range
	}
	return closure
}

// useEditor reducer.
function reducer(draft, action) {
	switch (action.type) {
	case "SELECT":
		SELECT(draft)(action.range)
		return
	// case "UPDATE_TODO":
	// 	UPDATE_TODO(draft)({ id: action.id, text: action.text })
	// 	return
	// case "REMOVE_TODO":
	// 	REMOVE_TODO(draft)({ id: action.id })
	// 	return
	// case "APPEND_TODO":
	// 	APPEND_TODO(draft)()
	// 	return
	default:
		throw new Error(`useEditor.reducer: type mismatch; type=${action.type}`)
	}
}

// DOMContentLoaded: false,
// readOnlyMode: false,
// elements,
// focused: false,
// range: {
// 	0: {
// 		key: "",
// 		offset: 0,
// 	},
// 	1: {
// 		key: "",
// 		offset: 0,
// 	},
// 	collapsed: true,
// },
// shouldRender: 0,

function useEditor(opts /* TODO */) {
	return useImmerReducer(reducer, null, () => ({
		range: new VirtualRange(),
	}))
}

export default useEditor
