import Node from "./Node"
import React from "react"

export const MemoParagraph = React.memo(({ id, children }) => (
	<Node id={id} style={{ minHeight: "1em" }} data-type="p">
		{children}
	</Node>
))

// ...
