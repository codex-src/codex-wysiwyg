import React from "react"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)

export default T
