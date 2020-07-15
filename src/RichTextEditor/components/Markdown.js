import React from "react"
import toArray from "lib/Array/toArray"

const Syntax = ({ className, style, children }) => (
	<span
		// className={className || "text-sm font-mono text-blue-600"}
		className={className || "text-blue-600"}
		style={style}
		data-type="markdown"
		contentEditable={false}
	>
		{children}
	</span>
)

const Markdown = ({ syntax, children }) => (
	<React.Fragment>
		<Syntax>
			{toArray(syntax)[0]}
		</Syntax>
		{children}
		<Syntax>
			{toArray(syntax).slice(-1)[0]}
		</Syntax>
	</React.Fragment>
)

export default Markdown
