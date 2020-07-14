import React from "react"

// Adds data-type and data-props to props.children.
const T = ({ type: T, props, children }) => (
	React.cloneElement(children, {
		"data-type": T,
		"data-props": props && JSON.stringify(props, null, " ")
			.replace(/\s*\n\s*/g, " "),
	})
)

export default T
