import React from "react"
import { typeMap } from "./components/typeMaps"

const ReactRenderer = ({ elements }) => (
	elements.map(({ type: T, key, props }) => (
		React.createElement(typeMap[T], {
			key,
			...{
				...props,
				$key: key,
			},
		})
	))
)

export default ReactRenderer
