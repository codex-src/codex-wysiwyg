import componentMap from "../componentMap"
import React from "react"
import toArray from "lib/x/toArray"
import toTree from "./toTree"

// Converts tree-shaped children to React elements.
function toReactTreeImpl(tree) {
	const renderable = []
	for (const each of toArray(tree)) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type, props } = each
		renderable.push(React.createElement(componentMap[type], {
			...props,
			key: renderable.length,
		}, props.children && toReactTreeImpl(props.children)))
	}
	if (!renderable.length || (typeof renderable[0] === "string" && !renderable[0])) {
		return null
	} else if (renderable.length === 1) {
		return renderable[0]
	}
	return renderable
}

// Converts children to React elements.
function toReactTree(children) {
	return toReactTreeImpl(toTree(children))
}

export default toReactTree
