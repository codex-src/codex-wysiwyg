// import areEqualTypesAndTypeProps from "./children/areEqualTypesAndTypeProps" // TODO: Deprecate?
import merge from "./children/merge"
import parse from "./intermediary/parse"
import React from "react"
import sort from "./children/sort"
import toArray from "lib/toArray"

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

// // Returns whether two intermediary inline elements are
// // equal in types and type-props or nested. Note that
// // untyped are not compared and return "uncommon".
// //
// // "unequal" -> Types or type-props are unequal
// // "equal"   -> Types and type-props are equal
// // "nested"  -> Types are nested; type-props must be equal
// //
// function areEqualOrNestedTypes(el1, el2) {
// 	if (el1.types.length === 0 || el2.types.length === 0) {
// 		return "unequal"
// 	}
// 	if (el1.types.length === el2.types.length) {
// 		return !areEqualTypesAndTypeProps(el1, el2) ? "unequal" : "equal"
// 	}
// 	// el2 must contain all of el1 types and more; the more
// 	// types be of a lower render precedence than the lowest
// 	// render precedence of el1. types
// 	return false
// }

// // Converts intermediary inline elements (children) to
// // renderable React elements.
// function toReact(children) {
// 	const renderable = []
// 	for (let x = 0; x < children.length; x++) {
// 		if (x - 1 >= 0) {
// 			switch (spanNestInfo(...)) {
// 			case "unequal":
// 				renderable.push(children[x])
// 				continue
// 			case "equal":
// 				renderable.splice(renderable.length - 1, 1, {
// 					...children[x - 1],
// 					props: {
// 						children: children[x - 1].props.children + children[x].props.children
// 					}
// 				})
// 				continue
// 			case "nested":
// 				// ...
// 			default:
// 				// No-op
// 				continue
// 			}
// 			// continue
// 		}
// 		renderable.push(children[x])
// 	}
// 	return "TODO"
// }

// Converts pseudo React elements to renderable React
// elements.
function toRenderableReact(elements) {
	const renderable = []
	for (const each of toArray(elements)) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type: T, props } = each
		renderable.push(React.createElement(typeMap[T], {
			key: renderable.length,
			...props,
		}, toRenderableReact(props.children)))
	}
	if (renderable.length === 0) {
		return null
	}
	return renderable
}

// Converts intermediary elements to renderable React
// elements. Pseudo React elements are used because React
// elements are read-only and cannot be mutated.
function toReact(children) {
	if (typeof children === "string") {
		return children
	}
	const renderable = []
	for (const each of toArray(children)) {
		if (each.types.length === 0) {
			renderable.push(each.props.children)
			continue
		}
		const element = {}
		let ref = element
		let prevRef = ref
		for (const T of each.types) {
			Object.assign(ref, { // <- prevPref
				type: T,
				props: {
					...each.props[T],
					children: {}, // <- ref
				}
			})
			prevRef = ref
			ref = ref.props.children
		}
		prevRef.props.children = toReact(each.props.children)
		renderable.push(element)
	}
	if (!renderable.length) {
		return null
	}
	return toRenderableReact(renderable)
}

const H1 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h1>
))
const H2 = React.memo(({ reactKey, children }) => (
	<h2 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h2>
))
const H3 = React.memo(({ reactKey, children }) => (
	<h3 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h3>
))
const H4 = React.memo(({ reactKey, children }) => (
	<h4 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h4>
))
const H5 = React.memo(({ reactKey, children }) => (
	<h5 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h5>
))
const H6 = React.memo(({ reactKey, children }) => (
	<h6 id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</h6>
))

const P = React.memo(({ reactKey, children }) => (
	<p id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</p>
))

const HR = React.memo(({ children }) => (
	<hr className="TODO" />
))

const Em = ({ children }) => (
	<em className="TODO">
		{children}
	</em>
)
const Strong = ({ children }) => (
	<strong className="TODO">
		{children}
	</strong>
)
const Code = ({ children }) => (
	<code className="TODO">
		{children}
	</code>
)
const Strike = ({ children }) => (
	<strike className="TODO">
		{children}
	</strike>
)
const A = ({ href, children }) => (
	<a className="TODO" href={href}>
		{children}
	</a>
)

const typeMap = {
	"h1": H1,
	"h2": H2,
	"h3": H3,
	"h4": H4,
	"h5": H5,
	"h6": H6,
	"p":  P,
	"hr": HR,

	"em":     Em,
	"strong": Strong,
	"code":   Code,
	"strike": Strike,
	"a":      A,
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
