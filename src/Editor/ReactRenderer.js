import React from "react"
import { typeMap } from "./components/types"

const ReactRenderer = ({ children: nodes }) => (
	nodes.map(({ type: T, key, props }) => (
		React.createElement(typeMap[T], {
			key,
			...{
				...props,
				reactKey: key,
			},
		}, props.children)
	))
)

export default ReactRenderer
