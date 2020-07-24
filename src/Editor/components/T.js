import React from "react"

// Adds [data-type] and [data-props].
const T = ({ type, props, /* markdown, */ children }) => (
	React.cloneElement(children, {
		"data-type": type,
		"data-props": props && JSON.stringify(props, null, " ")
			.replace(/\s*\n\s*/g, " "),
	})
)

export default T
