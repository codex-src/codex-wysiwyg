import React from "react"
import toArray from "lib/toArray"
import toTree from "./toTree"
import typeMap from "./typeMap"

// Converts intermediary tree data structure to renderable
// React elements.
function toRenderable(tree) {
	const renderable = []
	for (const each of toArray(tree)) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type: T, props } = each
		renderable.push(React.createElement(typeMap[T], {
			key: renderable.length,
			...props,
		}, toRenderable(props.children)))
	}
	return renderable
}

// Converts an array of spans to an intermediary tree data
// structure to renderable React elements. Uses an
// intermediary step because React elements are read-only.
function toReact(spans) {
	const tree = toTree(spans)
	const renderable = toRenderable(tree)
	if (!renderable.length) {
		return null // Prefer null for {... || <br />}
	}
	return renderable
}

export default toReact
