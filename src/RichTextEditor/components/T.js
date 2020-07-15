import React from "react"
import toArray from "lib/Array/toArray"

// Adds [data-type], [data-props], and [data-markdown].
const T = ({ type, props, markdown, children }) => (
	React.cloneElement(children, {
		"data-type": type,
		"data-props": props && JSON.stringify(props, null, " ").replace(/\s*\n\s*/g, " "),
		"data-markdown-start": toArray(markdown)[0],
		"data-markdown-end": toArray(markdown).slice(-1)[0],
	})
)

export default T
