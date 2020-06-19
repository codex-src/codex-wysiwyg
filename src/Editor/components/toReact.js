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
	const types = [...span.types]
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !types.length) {
		return [elements, types]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	for (let T = types[0]; types.length; types.shift()) {
		if (ref.type !== T || !areEqualJSON(omitKey(ref.props, "children"), span.props[T])) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children // TOOD: Add support for arrays?
	}
	if (lastRef === ref) {
		return [elements, types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, types]
}

// Converts spans to intermediary elements.
function toElements(spans) {
	const elements = []
	for (const each of spans) {
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
		lastRef.props.children = each.props.children
		elementsRef.push(element)
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
