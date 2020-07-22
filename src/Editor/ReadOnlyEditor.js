import componentMap from "./components/componentMap"
import parseElements from "./useEditor/parseElements"
import React from "react"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ children }) => {
	const elements = parseElements({ children })
	return (
		<article className="em-context">
			{elements.map(({ type, key, props }) => (
				React.createElement(componentMap[type], {
					key,
					id: key,
					...props,
				})
			))}
		</article>
	)
}

export default ReadOnlyEditor
