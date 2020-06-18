import merge from "./children/merge"
import parse from "./intermediary/parse"
import React from "react"
import sort from "./children/sort"

// // Parses VDOM spans to pseudo-React elements.
// function parse(spans) {
// 	const elements = []
// 	for (const span of spans) {
// 		if (!span.formats.length) {
// 			elements.push(span.textContent)
// 			continue
// 		}
// 		const element = {}
// 		let lastRef = element
// 		let ref = lastRef
// 		for (const format of span.formats.sort()) {
// 			Object.assign(ref, { // <- lastRef
// 				type: format,
// 				props: {
// 					...span[format],
// 					children: {}, // <- ref
// 				},
// 			})
// 			lastRef = ref
// 			ref = ref.props.children
// 		}
// 		lastRef.props.children = span.textContent
// 		elements.push(element)
// 	}
// 	decorate(elements)
// 	return elements
// }

// Renders children from intermediary React elements to
// React elements.
function render(children) {
	const renderable = []
	for (const each of children) {
		// ...
	}
	console.log(children)
	return "TODO"
}

const H1 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))
const H2 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))
const H3 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))
const H4 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))
const H5 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))
const H6 = React.memo(({ children }) => (
	<h1 className="TODO">
		{render(children) || (
			<br />
		)}
	</h1>
))

const P = React.memo(({ children }) => (
	<p className="TODO">
		{render(children) || (
			<br />
		)}
	</p>
))

const HR = React.memo(({ children }) => (
	<hr />
))

const typeMap = {
	"h1": H1,
	"h2": H2,
	"h3": H3,
	"h4": H4,
	"h5": H5,
	"h6": H6,
	"p":  P,
	"hr": HR,
}

const ReactRenderer = ({ children: intermediary }) => (
	intermediary.map(({ type: T, key, props }) => (
		React.createElement(typeMap[T], {
			key,
			...{
				...props,
				reactKey: key,
			},
		}, props.children)
	))
)

const Editor = ({ children }) => {
	const intermediary = React.useMemo(() => {
		return parse(children).map(each => {
			switch ("<" + each.type + ">") {
			case "<h1>":
			case "<h2>":
			case "<h3>":
			case "<h4>":
			case "<h5>":
			case "<h6>":
				merge(each.props.children).map(each => sort(each))
				break
			case "<p>":
				merge(each.props.children).map(each => sort(each))
				break
			case "<hr>":
				// No-op
				break
			default:
				throw new Error("unknown type")
			}
			return each
		})
	}, [children])

	return (
		<div>

			{children}

			<ReactRenderer>
				{intermediary}
			</ReactRenderer>

			{/* Debugger */}
			<div className="whitespace-pre text-xs font-mono" style={{ tabSize: 2 }}>
				{JSON.stringify(intermediary, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
