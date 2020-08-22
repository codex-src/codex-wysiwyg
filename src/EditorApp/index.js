import React from "react"

import {
	Editor,
	useEditor,
} from "Editor"

const EditorApp = () => {
	const [state, dispatch] = useEditor("Hello, world!")

	return (
		<Editor
			className="focus:outline-none"

			state={state}
			dispatch={dispatch}
		/>
	)
}

const Layout = () => (
	<div className="px-4 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<EditorApp />
		</div>
	</div>
)

export default Layout
