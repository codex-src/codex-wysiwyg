import React from "react"

import {
	MemoParagraph,
} from "./Block"

const Elements = ({ elements }) => (
	elements.map(each => (
		React.createElement(MemoParagraph /* componentMap[each.type] */, { // TODO
			...each.props,
			key: each.key, // React key
			id:  each.key, // DOM ID
		})
	))
)

export default Elements
