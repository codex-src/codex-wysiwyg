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
		console.log({ markup })
		const domTree = markupToDOMTree(markup)
		deeplySyncDOMTrees(domTree, ref.current)
	}, [children])

	return (
		<div
			ref={ref}
			id={id}
			style={{
				// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
				...style, // Takes precedence
				caretColor: "var(--black)",
				whiteSpace: "pre-wrap",
				// wordBreak: "break-word", // ??
				overflowWrap: "break-word",
			}}
			{...props}
		/>
	)
}

// TODO: Remove React.memo?
export const P = React.memo(({ id, spans }) => (
	<T type={Types.enum.p}>
		<Node id={id}>
			{toReact(spans) || (
				<br />
			)}
		</Node>
	</T>
))
