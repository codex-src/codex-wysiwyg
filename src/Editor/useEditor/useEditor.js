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
	// history: ...

	elements: [
		{
			key: "abc-xyz",
			props: {
				children: "",
			},
		},
	],
	shouldRerender: 0,
})

const actions = state => ({
	enableReadOnlyMode() {
		state.readOnlyMode = true
	},
	enableReadWriteMode() {
		state.readOnlyMode = false
	},
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
	case "ENABLE_READ_ONLY_MODE":
		actions(state).enableReadOnlyMode()
		return
	case "ENABLE_READ_WRITE_MODE":
		actions(state).enableReadWriteMode()
		return
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
