import componentMap from "./components/componentMap"
import parseElements from "./useEditor/parseElements"
import React from "react"
import tmpl from "lib/x/tmpl"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ className, style, children }) => {
	const elements = parseElements({ children })
	return (
		<article className={tmpl`em-context ${className}`} style={style}>
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
