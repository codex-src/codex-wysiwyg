import componentMap from "./components/componentMap"
import React from "react"
import { initElementsFromChildren } from "./parsers"

import "./Editor.css"

// Renders a read-only editor.
const ReadOnlyEditor = ({ id, className, style, children }) => {
	const elements = React.useMemo(() => {
		return initElementsFromChildren(children)
	}, [children])

	return (
		<article
			id={id}
			className={`em-context ${className}`.trim()}
			style={style}
		>
			{elements.map(each => (
				React.createElement(componentMap[each.type], {
					...each.props,
					key: each.key, // For React
					id:  each.key, // For the DOM
				})
			))}
		</article>
	)
}

export default ReadOnlyEditor
