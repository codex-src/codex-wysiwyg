import React from "react"
import { typeMap } from "./components/typeMaps"

const Renderer = ({ state, dispatch }) => (
	state.elements.map(({ type, key, props }) => (
		React.createElement(typeMap[type], {
			type,
			key,
			id: key, // Pass key as "id"
			...props,
		})
	))
)

export default Renderer
