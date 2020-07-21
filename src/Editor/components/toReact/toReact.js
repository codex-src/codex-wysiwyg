import componentMap from "../componentMap"
import React from "react"
import toArray from "lib/x/toArray"
import toIntermediary from "./toIntermediary"

// Converts intermediary React elements to React elements.
function toReactHandler(intermediary) {
	const renderable = []
	for (const each of toArray(intermediary)) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type, props } = each
		renderable.push(React.createElement(componentMap[type], {
			...props,
			key: renderable.length,
		}, props.children && toReactHandler(props.children)))
	}
	if (!renderable.length || (typeof renderable[0] === "string" && !renderable[0])) {
		return null
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
