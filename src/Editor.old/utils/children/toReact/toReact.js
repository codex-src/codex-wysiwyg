import React from "react"
import renderMap from "../../../components/renderMap"
import toArray from "./toArray"
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
			...props, // Takes precedence
			key: renderable.length,
		}, toReactHandler(props.children)))
	}
	// Guard: [] -> null:
	if (!renderable.length || (typeof renderable[0] === "string" && !renderable[0])) {
		return null
	// Guard: [{ ... }] -> { ... }
	} else if (renderable.length === 1) {
		return renderable[0]
	}
	return renderable
}

// Converts children to React elements. Uses an intermediary
// step because React elements are read-only.
function toReact(children) {
	const intermediary = toIntermediary(children)
	return toReactHandler(intermediary)
}

export default toReact
