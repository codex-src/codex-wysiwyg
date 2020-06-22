import React from "react"
import { typeMap } from "./components/typeMaps"

const ReactRenderer = ({ elements }) => (
	elements.map(({ type: T, key, props }) => (
		// NOTE: Propogates key as props.id because React
		// reserves props.key.
		React.createElement(typeMap[T], {
			key,
			id: key,
			...props,
		})
	))
)

export default ReactRenderer
