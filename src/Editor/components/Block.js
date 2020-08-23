// import MarkdownFragment as Markdown from "./HOC/MarkdownFragment"
import Node from "./HOC/Node"
import React from "react"
import Type from "./HOC/Type"

// <p>
export const MemoParagraph = React.memo(({ id, children }) => (
	<Type type="p">
		<Node id={id} style={{ height: !children /* lineHeight */ && "1em" }}>
			{children || (
				<br />
			)}
		</Node>
	</Type>
))

// ...

