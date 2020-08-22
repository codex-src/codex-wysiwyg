import { useImmerReducer } from "use-immer"

const createInitialState = initialValueMarkdown => ({
	// ...
})

const actions = state => ({
	a() {

	},
	b() {

	},
})

function EditorReducer(state, action) {
	switch (action.type) {
	case "A":
		actions(state).a()
		return
	case "B":
		actions(state).a()
		return
	default:
		throw new Error(`EditorReducer: type mismatch; action.type=${action.type}`)
	}
}

function useEditor(initialValueMarkdown) {
	return useImmerReducer(EditorReducer, {}, () => createInitialState(initialValueMarkdown))
}

export default useEditor
