import Node from "./HOC/Node"
import React from "react"
import Type from "./HOC/Type"

// <p>
export const MemoParagraph = React.memo(({ id, children }) => (
	<Type type="p">
		<Node id={id} style={{ minHeight: "1em" }}>
			{children}
		</Node>
	</Type>
))

// ...
