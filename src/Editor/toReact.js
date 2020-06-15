import React from "react"

// Converts pseudo-React elements to renderable React
// elements.
function toReact(elements, renderableMap) {
	const renderable = []
	for (const component of [elements].flat()) {
		if (typeof component === "string") {
			renderable.push(component)
			continue
		}
		const { type: T, props } = component
		renderable.push(React.createElement(renderableMap[T], {
			key: renderable.length,
			...props,
		}, toReact(props.children, renderableMap)))
	}
	// NOTE: Does not return an empty array -- uses null for
	// {children || <br />} case
	if (!renderable.length) {
		return null
	}
	return renderable
}

export default toReact
