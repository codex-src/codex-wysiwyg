import React from "react"

import {
	CodexReadWriteEditor,
	useCodexEditor,
} from "Editor"

// TODO: Add support for useCodexEditorFromID(...)?
const EditorApp = () => {
	const [state, dispatch] = useCodexEditor("Hello, world!")

	// <CodexReadOnlyEditor markdown="..." />
	return (
		<CodexReadWriteEditor
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
