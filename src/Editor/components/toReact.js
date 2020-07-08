import React from "react"
import toArray from "lib/toArray"
import toTree from "./toTree"
import types from "../types"

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
		renderable.push(React.createElement(types.components[T], {
			key: renderable.length,
			...props,
		}, toRenderable(props.children)))
	}
	return renderable
}

// Converts an array of spans to an intermediary tree data
// structure to renderable React elements. Uses an
// intermediary step because React elements are read-only.
//
// TODO: Move to useEditor/model/Spans
function toReact(spans) {
	const tree = toTree(spans)
	const renderable = toRenderable(tree)
	// NOTE: Returns null for {... || <br />} case.
	if (!renderable.length || !renderable[0]) {
		return null
	}
	return renderable
}

export default toReact
