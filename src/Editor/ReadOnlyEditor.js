import componentMap from "./components/componentMap"
import parseElements from "./useEditor/parseElements"
import React from "react"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ className, style, children }) => {
	const elements = parseElements({ children })
	return (
		<div className="em-context">
			<article className={className} style={style}>
				{elements.map(({ type, key, props }) => (
					React.createElement(componentMap[type], {
						key,
						id: key,
						...props,
					})
				))}
			</article>
		</div>
	)
}

export default ReadOnlyEditor
