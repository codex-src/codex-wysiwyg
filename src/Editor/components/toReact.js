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

// Traverses intermediary elements for an element array to
// push the next span.
function traverse(elements, span) {
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !span.types.length) {
		return [elements, span.types]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	// NOTE: let T = types[0]; types.length; types.shift()
	// does not work as expected.
	let x = 0
	for (; x < span.types.length; x++) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== span.types[x] || !areEqualJSON(omitKey(ref.props, "children"), span.props[span.types[x]])) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	if (lastRef === ref) {
		return [elements, span.types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, span.types.slice(x)]
}

// Converts spans to intermediary elements.
function toElements(spans) {
	const elements = []
	for (const each of spans) {

		// if (!each.types.length) {
		// 	elements.push(each.props.children)
		// 	continue
		// }

		// const [elementsRef, types] = [elements, each.types]
		const [elementsRef, types] = traverse(elements, each)
		if (!types.length) {
			elementsRef.push(each.props.children)
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
		// lastRef.props.children = toArray(each.props.children)
		lastRef.props.children = each.props.children
		elementsRef.push(element)
	}
	console.log(elements) // DEBUG
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
