import React from "react"

export const Element = ({ type, props, children }) => (
	React.cloneElement(children, {
		style: {
			...children.props.style, // Takes precedence
			// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
			whiteSpace: "pre-wrap",
			overflowWrap: "break-word",
		},
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
