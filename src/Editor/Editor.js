import merge from "./children/merge"
import omitKey from "lib/omitKey"
import parse from "./intermediary/parse"
import React from "react"
import sort from "./children/sort"
import toArray from "lib/toArray"
import typeMap from "./components/typeMap"

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
	if (!renderable.length) {
		return null
	}
	return renderable
}

// Finds a container that matches types and type-props.
function findContainer(elements, { types, props }) {
	if (!elements.length || typeof elements[elements.length - 1] === "string") {
		return [elements, types]
	}
	let ref = elements[elements.length - 1]
	let lastRef = ref
	let x = 0
	for (; x < types.length; x++) {
		if (ref.type !== types[x] || JSON.stringify(omitKey(ref.props, "children")) !== JSON.stringify(props[types[x]])) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	// Do not mutate lastRef.props.children when lastRef and
	// ref are equal:
	if (lastRef === ref) {
		return [elements, types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, types.slice(x)]
}

// Converts intermediary elements to renderable React
// elements. Non-renderable elements are used because React
// elements are read-only.
function toReact(children) {
	if (typeof children === "string") {
		return children
	}
	const elements = []
	for (const each of toArray(children)) {
		if (!each.types.length) {
			elements.push(each.props.children)
			continue
		}
		const [container, types] = findContainer(elements, each)
		if (!types.length) {
			container.push(each.props.children)
			continue
		}
		const element = {}
		let ref = element
		let lastRef = ref
		for (const T of types) {
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
		container.push(element)
	}
	if (!elements.length) {
		return null
	}
	return createElements(elements)
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
