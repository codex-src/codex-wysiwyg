import * as actions from "./actions"

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

export default reducer
