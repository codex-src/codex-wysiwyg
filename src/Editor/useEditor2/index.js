// import reducerTypes as t from "./reducerTypes"
import VirtualRange from "../model/VirtualRange"
import { useImmerReducer } from "use-immer"

// Disables read-only mode; enables future edits.
function DISABLE_READ_ONLY_MODE(draft) {
	const closure = () => {
		draft.readOnlyMode = false
	}
	return closure
}

// Enables read-only mode; disables future edits.
function ENABLE_READ_ONLY_MODE(draft) {
	const closure = () => {
		draft.readOnlyMode = true
	}
	return closure
}

// Focuses the editor. When the editor is focused, editing
// operations **are** expected to work.
function FOCUS(draft) {
	const closure = () => {
		draft.focused = true
	}
	return closure
}

// Blurs the editor. When the editor is blurred, editing
// operations **are not** expected to work.
function BLUR(draft) {
	const closure = () => {
		draft.focused = false
	}
	return closure
}

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
	case "DISABLE_READ_ONLY_MODE":
		DISABLE_READ_ONLY_MODE(draft)()
		return
	case "ENABLE_READ_ONLY_MODE":
		ENABLE_READ_ONLY_MODE(draft)()
		return
	case "FOCUS":
		FOCUS(draft)()
		return
	case "BLUR":
		BLUR(draft)()
		return
	case "SELECT":
		SELECT(draft)(action.range)
		return
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
		readOnlyMode: true,
		focused: false,
		range: new VirtualRange(),
	}))
}

export default useEditor
