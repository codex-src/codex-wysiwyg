import React from "react"

// Decorates [data-type] and [data-props].
const Type = ({ type, props, /* markdown, */ children }) => (
	React.cloneElement(children, {
		"data-type": type,
		"data-props": props && JSON.stringify(props, null, " ")
			.replace(/\s*\n\s*/g, " "),
	})
)

export default Type
