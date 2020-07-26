import componentMap from "./components/componentMap"
import React from "react"
import tmpl from "lib/x/tmpl"
import { initElementsFromChildren } from "./parsers"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ className, style, children }) => {
	const elements = React.useMemo(() => {
		return initElementsFromChildren(children)
	}, [children])
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
