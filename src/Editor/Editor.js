import mergeSpans from "./spans/mergeSpans"
import parseNodes from "./nodes/parseNodes"
import React from "react"
import ReactRenderer from "./ReactRenderer"
import sortSpans from "./spans/sortSpans"

const Editor = ({ children }) => {
	const nodes = React.useMemo(() => {
		return parseNodes(children).map(each => {
			switch (each.type) {
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
				sortSpans(mergeSpans(each.props.children))
				break
			case "p":
				sortSpans(mergeSpans(each.props.children))
				break
			case "hr":
				// No-op
				break
			default:
				throw new Error("FIXME: unknown type")
			}
			return each
		})
	}, [children])

	return (
		<div>

			{children}

			<div className="mt-6" />

			<ReactRenderer>
				{nodes}
			</ReactRenderer>

			{/* Debugger */}
			<div className="mt-6 whitespace-pre text-xs font-mono" style={{ tabSize: 2 }}>
				{JSON.stringify(nodes, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
