import React from "react"
import ReactDOMServer from "react-dom/server"
import syncDOM from "./syncDOM"
import T from "./T"
import toReact from "./toReact"
import types from "./types"

// Renders markup to HTML.
//
// NOTE: renderToStaticMarkup is synchronous;
// ReactDOM.render is asynchronous.
function markupToHTML(text_html) {
	const fragment = document.createDocumentFragment()
	const doc = new DOMParser().parseFromString(text_html, "text/html")
	fragment.append(...doc.body.childNodes)
	return fragment
}

const Node = ({ id, style, children, ...props }) => {
	const ref = React.useRef(null)

	React.useLayoutEffect(() => {
		if (!ref.current) {
			// No-op
			return
		}
		const markup = ReactDOMServer.renderToStaticMarkup(children)
		const fragment = markupToHTML(markup)
		// TODO
		;[...ref.current.childNodes].reverse().map(each => each.remove())
		ref.current.append(...fragment.childNodes)
	}, [children])

	return React.createElement("div", {
		ref,
		id,
		style: {
			// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
			...style, // Takes precedence
			whiteSpace: "pre-wrap",
			overflowWrap: "break-word",
		},
		...props,
	})
}

// export const P = React.memo(({ id, spans }) => {
export const P = ({ id, spans }) => (
	<T type={types.p}>
		<Node id={id}>
			{toReact(spans) || (
				<br />
			)}
		</Node>
	</T>
)
