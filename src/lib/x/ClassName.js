import React from "react"
import tmpl from "lib/x/tmpl"

const ClassName = ({ className, children }) => (
	React.cloneElement(children, {
		className: tmpl`${children.props.className}
			${className}`,
	})
)

export default ClassName
