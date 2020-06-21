import areEqualJSON from "lib/areEqualJSON"
import omitKey from "lib/omitKey"
import React from "react"
import toArray from "lib/toArray"
import { typeMap } from "./typeMaps"

// Converts intermediary elements to React elements.
function toReactElements(elements) {
	const reactElements = []
	for (const each of toArray(elements)) {
		if (typeof each === "string") {
			reactElements.push(each)
			continue
		}
		const { type: T, props } = each
		reactElements.push(React.createElement(typeMap[T], {
			key: reactElements.length,
			...props,
		}, toReactElements(props.children)))
	}
	return reactElements
}

// Queries the most recent intermediary element for a
// container (array) to push the next intermediary element.
function queryContainer(elements, { types, props }) {
	const nextTypes = [...types]
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !nextTypes.length) {
		return [elements, nextTypes]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	for (let T = nextTypes[0]; nextTypes.length; nextTypes.shift(), T = nextTypes[0]) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== T || !areEqualJSON(omitKey(ref.props, "children"), props[T])) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	// Guard lastRef.props.children = toArray(ref); prevents
	// stack exceeded error:
	if (lastRef === ref) {
		return [elements, nextTypes]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, nextTypes]
}

// Converts spans to intermediary elements.
function toElements(spans) {
	const elements = []
	for (const each of spans) {
		const [container, types] = queryContainer(elements, each)
		if (!types.length) {
			container.push(each.props.children)
			continue
		}
		const element = {}
		let lastRef = element
		let ref = lastRef
		for (const T of types) {
			Object.assign(ref, {
				type: T,
				props: {
					...each.props[T],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = each.props.children
		container.push(element)
	}
	return elements
}

// Converts spans to React elements. Uses intermediary
// elements because React elements are read-only.
function toReact(spans) {
	const elements = toElements(spans)
	const reactElements = toReactElements(elements)
	if (!reactElements.length) {
		return null
	}
	return reactElements
}

export default toReact
