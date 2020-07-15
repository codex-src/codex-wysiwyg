import React from "react"
import toArray from "lib/Array/toArray"

const Syntax = ({ children }) => (
	<span className="text-sm font-mono text-blue-600" data-type="markdown" contentEditable={false}>
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
