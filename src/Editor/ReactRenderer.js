import React from "react"
import { typeMap } from "./components/typeMaps"

const ReactRenderer = ({ children: nodes }) => (
	nodes.map(({ type: T, key, props }) => (
		React.createElement(typeMap[T], {
			key,
			...{ ...props, reactKey: key },
		})
	))
)

export default ReactRenderer
