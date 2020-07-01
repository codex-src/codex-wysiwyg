import * as Types from "../Types"
import deeplySyncDOMTrees from "../deeplySyncDOMTrees"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import T from "./T"
import toReact from "./toReact"

const Node = ({ id, style, children, ...props }) => {
	const ref = React.useRef(null)

	React.useLayoutEffect(() => {
		if (!ref.current) {
			// No-op
			return
		}
		// NOTE: Uses ReactDOMServer.renderToStaticMarkup
		// because ReactDOM.render is asynchronous.
		const markup = ReactDOMServer.renderToStaticMarkup(children)
		const domTree = markupToDOMTree("<div>" + markup + "</div>")

		// ;[...ref.current.childNodes].reverse().map(each => each.remove())
		// ref.current.append(...domTree.childNodes)

		deeplySyncDOMTrees(domTree, ref.current)
	}, [children])

	return (
		<div
			ref={ref}
			id={id}
			style={{
				...style, // Takes precedence
				minHeight: "calc(var(--line-height) * 1em)",

				// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
				caretColor: "var(--black)",
				whiteSpace: "pre-wrap",
				// wordBreak: "break-word", // TODO?
				overflowWrap: "break-word",
			}}
			{...props}
		/>
	)
}

export const P = React.memo(({ id, spans }) => (
	<T type={Types.enum.p}>
		<Node id={id} style={{ "--line-height": 1.5 }}>
			{toReact(spans) || (
				<br />
			)}
		</Node>
	</T>
))
