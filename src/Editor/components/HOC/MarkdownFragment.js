import React from "react"
import toArray from "lib/x/toArray"
import { Syntax } from "../Inline"

const MarkdownFragment = ({ markdown, children }) => {
	const start = toArray(markdown)[0]
	const end = toArray(markdown).slice(-1)[0]
	return (
		<React.Fragment>
			{Boolean(start) && (
				<Syntax>
					{start}
				</Syntax>
			)}
			{children}
			{Boolean(end) && (
				<Syntax>
					{end}
				</Syntax>
			)}
		</React.Fragment>
	)
}

export default MarkdownFragment
