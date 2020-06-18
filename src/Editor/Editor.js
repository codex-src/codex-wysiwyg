// import areEqualTypesAndTypeProps from "./children/areEqualTypesAndTypeProps" // TODO: Deprecate?
import merge from "./children/merge"
import parse from "./intermediary/parse"
import React from "react"
import sort from "./children/sort"
import toArray from "lib/toArray"

// Converts non-renderable React elements to renderable
// React elements.
function createElements(elements) {
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
		}, createElements(props.children)))
	}
	if (renderable.length === 0) {
		return null
	}
	return renderable
}

// Converts intermediary elements to renderable React
// elements. Non-renderable elements are used because React
// elements are read-only.
function toReact(children) {
	if (typeof children === "string") {
		return children
	}

	// Finds the last instance of an element that nests up to
	// all of the following types.
	const findLastInstanceOf = (renderable, types) => {
		if (!renderable.length) {
			return null
		} else if (renderable.length && typeof renderable[renderable.length - 1] === "string") {
			return null
		}
		let ref = renderable[renderable.length - 1]
		let lastRef = ref
		for (const T of types) {
			if (ref.type !== T) {
				// No-op
				break
			}
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = toArray(ref)
		return lastRef
	}

	const renderable = []
	for (const each of toArray(children)) {
		if (each.types.length === 0) {
			renderable.push(each.props.children)
			continue
		}

		const instance = findLastInstanceOf(renderable, each.types)
		if (instance) {
			console.log(each.types)
			console.log(JSON.stringify(instance, null, "\t"))
		}

		const element = {}
		let ref = element
		let lastRef = ref
		for (const T of each.types) {
			Object.assign(ref, { // <- prevPref
				type: T,
				props: {
					...each.props[T],
					children: {}, // <- ref
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = toReact(each.props.children)
		renderable.push(element)
	}
	if (!renderable.length) {
		return null
	}
	return createElements(renderable)
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
