import deeplySyncTrees from "../utils/deeplySyncTrees"
import parseTree from "lib/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import T from "./T"
import toReact from "../utils/children/toReact"

const Element = ({ id, style, children, ...props }) => {
	const ref = React.useRef(null)

	// NOTE: React does not manage rendered children.
	React.useLayoutEffect(() => {
		if (!ref.current) {
			// No-op
			return
		}
		// NOTE: Uses ReactDOMServer.renderToStaticMarkup
		// because ReactDOM.render is asynchronous.
		const markup = ReactDOMServer.renderToStaticMarkup(children)
		const tree = parseTree("<div>" + markup + "</div>")
		deeplySyncTrees(tree, ref.current)
	}, [children])

	// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
	const imperativeStyles = {
		...style, // Takes precedence
		whiteSpace: "pre-wrap",
		overflowWrap: "break-word",
	}

	return <div ref={ref} id={id} style={imperativeStyles} {...props} />
}

// <p id="...">
export const P = React.memo(({ id, children }) => (
	<T type="p">
		<Element id={id}>
			{toReact(children) || (
				<br />
			)}
		</Element>
	</T>
))
