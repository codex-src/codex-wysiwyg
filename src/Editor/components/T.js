import React from "react"

const T = ({ type: T, props, children }) => (
	React.cloneElement(children, {
		// Enum type:
		"data-type": T,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props, null, " ")
			.replace(/\s*\n\s*/g, " "),
	})
)

export default T
