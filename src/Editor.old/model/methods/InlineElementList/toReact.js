import React from "react"
import renderMap from "../../../components/renderMap"
import toArray from "./toArray"
import toIntermediary from "./toIntermediary"

// Converts intermediary React elements to React elements.
function toReact(intermediary) {
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
		}, toReact(props.children)))
	}
	// [] -> null:
	if (!renderable.length || (typeof renderable[0] === "string" && !renderable[0])) {
		return null
	// [{ ... }] -> { ... }:
	} else if (renderable.length === 1) {
		return renderable[0]
	}
	return renderable
}

export default toReact
