import componentMap from "./componentMap"
import React from "react"

const Elements = ({ elements }) => (
	elements.map(each => (
		React.createElement(componentMap[each.type], {
			...each.props,
			key: each.key, // React key
			id:  each.key, // DOM ID
		})
	))
)

export default Elements
