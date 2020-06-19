import * as Nodes from "./Nodes"
import * as Spans from "./Spans"
import React from "react"
import ReactRenderer from "./ReactRenderer"
import { typeEnum } from "./components/typeMaps"

const Editor = ({ children }) => {
	const nodes = React.useMemo(() => {
		return Nodes.parseReact(children).map(each => {
			switch (each.type) {
			case typeEnum.h1:
			case typeEnum.h2:
			case typeEnum.h3:
			case typeEnum.h4:
			case typeEnum.h5:
			case typeEnum.h6:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.p:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.hr:
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

			<article
				className="whitespace-pre-wrap focus:outline-none"
				// contentEditable
				// suppressContentEditableWarning
				data-codex-root
			>
				{children}
			</article>

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
