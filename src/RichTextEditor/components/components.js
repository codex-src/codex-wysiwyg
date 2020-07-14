import Node from "./Node"
import React from "react"
import T from "./T"
import toReact from "./toReact"

// Renders <p id="...">.
export const P = React.memo(({ id, children }) => (
	<T type="p">
		<Node id={id}>
			{toReact(children) || (
				<br />
			)}
		</Node>
	</T>
))
