import React from "react"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		"data-type":  type,
		"data-props": props && JSON.stringify(props),
	})
)

export default T
