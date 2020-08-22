import React from "react"

import {
	Editor,
	useEditor,
} from "Editor"

const EditorApp = () => {
	const [state, dispatch] = useEditor("Hello, world!")

	return (
		<Editor
			state={state}
			dispatch={dispatch}
		/>
	)
}

export default EditorApp
