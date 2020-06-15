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
	// NOTE: Uses null for {children || <br />}.
	if (!renderable.length) {
		return null
	}
	return renderable
}

export default toReact
