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
	renderable: [
		{
			key: "abc-xyz",
			props: {
				children: "",
			},
		},
	],
})

const actions = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(range) {
		state.cursors = range
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
	case "SELECT":
		actions(state).select(action.range)
		return
	default:
		throw new Error(`EditorReducer: type mismatch; action.type=${action.type}`)
	}
}

function useEditor(initialValueMarkdown) {
	return useImmerReducer(EditorReducer, {}, () => createInitialState(initialValueMarkdown))
}

export default useEditor
