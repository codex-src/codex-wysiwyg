import React from "react"
import ReactDOMServer from "react-dom/server"
import syncDOM from "./syncDOM"
import toReact from "./toReact"
import types from "./types"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)

const Node = React.forwardRef(({ id, style, children }, ref) => {

	// NOTE: children are not managed by React.
	// TODO: Reimplement syncDOM for inline elements
	React.useLayoutEffect(() => {
		if (!ref.current) {
			// No-op
			return
		}

		// Renders markup to HTML.
		function markupToHTML(text_html) { // TODO
			const fragment = document.createDocumentFragment()
			const doc = new DOMParser().parseFromString(text_html, "text/html")
			fragment.append(...doc.body.childNodes)
			return fragment
		}

		const markup = ReactDOMServer.renderToStaticMarkup(children)
		const fragment = markupToHTML(markup)
		// TODO
		;[...ref.current.childNodes].reverse().map(each => each.remove())
		ref.current.append(...fragment.childNodes)
	}, [ref, children])

	return React.createElement("div", {
		ref,
		id,
		style: {
			// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
			...style, // Takes precedence
			whiteSpace: "pre-wrap",
			overflowWrap: "break-word",
		},
	})
})

export const P = React.memo(({ id, spans }) => {
	const ref = React.useRef(null)
	return (
		<T type={types.p}>
			<Node ref={ref} id={id}>
				{toReact(spans) || (
					<br />
				)}
			</Node>
		</T>
	)
})
