import deeplySyncTrees from "lib/DOM/deeplySyncTrees"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"

// Renders an element. Note that props.children are not
// rendered or managed by React.
const Node = ({ id, className, style, children, ...props }) => {
	const ref = React.useRef()

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

	const imperativeStyle = {
		...style,

		// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
		whiteSpace: "pre-wrap",
		overflowWrap: "break-word",
	}

	return (
		<div
			ref={ref}
			id={id}
			className={className}
			style={imperativeStyle}
			data-feature-empty={!children.length || undefined}
			{...props}
		/>
	)
}

export default Node
