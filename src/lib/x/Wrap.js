import React from "react"
import tmpl from "lib/x/tmpl"

// Wraps props.children; adds className and style.
const Wrap = ({ className, style, children, ...props }) => (
	React.cloneElement(children, {
		className: tmpl`${children.props.className} ${className}`,
		style: { ...children.props.style, ...style },
		...props,
	})
)

export default Wrap
