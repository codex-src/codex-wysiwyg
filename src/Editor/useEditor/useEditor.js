import { useImmerReducer } from "use-immer"

const createInitialState = initialValueMarkdown => ({
	readOnlyMode: false,

	focused: false,
	content: [],
	cursors: {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
	},

	shouldRerender: 0,
})

const actions = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
})

function EditorReducer(state, action) {
	switch (action.type) {
	case "FOCUS":
		actions(state).focus()
		return
	case "BLUR":
		actions(state).blur()
		return
	default:
		throw new Error(`EditorReducer: type mismatch; action.type=${action.type}`)
	}
}

function useEditor(initialValueMarkdown) {
	return useImmerReducer(EditorReducer, {}, () => createInitialState(initialValueMarkdown))
}

export default useEditor
