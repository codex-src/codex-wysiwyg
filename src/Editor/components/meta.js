import React from "react"

export const Element = ({ type, props, children }) => (
	React.cloneElement(children, {
		style: {
			...children.props.style, // Takes precedence
			// TODO
			whiteSpace: "pre-wrap",
			wordBreak: "break-word",
		}
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)

export const Span = ({ type, props, children }) => (
	React.cloneElement(children, {
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)
