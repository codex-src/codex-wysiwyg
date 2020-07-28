import componentMap from "./components/componentMap"
import React from "react"
import { initElementsFromChildren } from "./parsers"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ id, className, style, children }) => {
	const elements = React.useMemo(() => {
		return initElementsFromChildren(children)
	}, [children])

	const $className = !className ? "em-context" : `em-context ${className}`
	return (
		<article id={id} className={$className} style={style}>
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
