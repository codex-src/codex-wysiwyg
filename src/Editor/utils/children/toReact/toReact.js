import React from "react"
import renderMap from "../../../components/renderMap"
import toArray from "lib/toArray"
import toIntermediary from "./toIntermediary"

// Converts intermediary React elements to React elements.
function toReactHandler(intermediary) {
	const renderable = []
	for (const each of toArray(intermediary)) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type: T, props } = each
		renderable.push(React.createElement(renderMap[T], {
			key: renderable.length,
			...props,
		}, toReactHandler(props.children)))
	}
	return renderable
}

// Converts children to React elements. Uses an intermediary
// step because React elements are read-only.
function toReact(children) {
	const intermediary = toIntermediary(children)
	const renderable = toReactHandler(intermediary)
	if (!renderable.length || !renderable[0]) {
		return null // -> {... || <br />}
	}
	return renderable
}

export default toReact
