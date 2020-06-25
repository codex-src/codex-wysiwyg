import React from "react"
import { typeMap } from "./typeMaps"

const Renderer = ({ state, dispatch }) => (
	state.elements.map(({ type, key, props }) => (
		React.createElement(typeMap[type], {
			type,
			key,
			id: key,
			...props,
		})
	))
)

export default Renderer
