import React from "react"
import toArray from "lib/x/toArray"

const Syntax = ({ children, ...props }) => (
	<span {...props}>
		{children}
	</span>
)

const Markdown = ({ markdown, children, ...props }) => (
	<React.Fragment>
		<Syntax {...props}>
			{toArray(markdown)[0]}
		</Syntax>
		{children}
		<Syntax {...props}>
			{toArray(markdown).slice(-1)[0]}
		</Syntax>
	</React.Fragment>
)

export default Markdown
