import React from "react"
import ReactDOMServer from "react-dom/server"
import syncDOM from "./syncDOM"
import toReact from "./toReact"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		style: {
			// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
			...children.props.style, // Takes precedence
			whiteSpace: "pre-wrap",
			overflowWrap: "break-word",
		},
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)

// Renders HTML text to HTML.
function toHTML(text_html) {
	const fragment = document.createDocumentFragment()
	const doc = new DOMParser().parseFromString(text_html, "text/html")
	fragment.append(...doc.body.childNodes)
	return fragment
}

function useDOMRenderer(ref, children) {
	React.useLayoutEffect(() => {
		if (!ref.current) {
			// No-op
			return
		}
		const markup = ReactDOMServer.renderToStaticMarkup(children)
		const fragment = toHTML(markup)
		// TODO
		;[...ref.current.childNodes].reverse().map(each => each.remove())
		ref.current.append(...fragment.childNodes)
	}, [ref, children])
}

// const DOMRenderer = ({ forwardedRef, children }) => {
// 	React.useLayoutEffect(() => {
// 		if (!forwardedRef.current) {
// 			// No-op
// 			return
// 		}
// 		const markup = ReactDOMServer.renderToStaticMarkup(children)
// 		const fragment = toHTML(markup)
// 		// TODO
// 		;[...forwardedRef.current.childNodes].reverse().map(each => each.remove())
// 		forwardedRef.current.append(...fragment.childNodes)
// 	}, [forwardedRef, children])
// 	return null
// }

export const P = React.memo(({ type, id, spans }) => {
	const ref = React.useRef(null)
	useDOMRenderer(ref, toReact(spans) || <br />)

	return (
		<T type={type}>
			<div ref={ref} id={id} />
		</T>
	)
})
