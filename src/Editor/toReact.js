import React from "react"

// Returns an array.
function toArray(value) {
	if (!Array.isArray(value)) {
		return [value]
	}
	return value
}

// Converts components to renderable React elements.
function toReact(components, renderableMap) {
	const renderable = []
	for (const component of toArray(components)) {
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
	if (!renderable.length) {
		return null
	}
	return renderable
}

export default toReact
