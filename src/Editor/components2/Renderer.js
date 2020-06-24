import React from "react"
import { typeMap } from "./typeMaps"

const Renderer = ({ state, dispatch }) => (
	state.elements.map(({ type: T, key, props }) => (
		React.createElement(typeMap[T], {
			key,
			id: key,
			...props,
		})
	))
)

export default Renderer
