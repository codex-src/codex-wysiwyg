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

// Queries the next intermediary element array and non-
// nested types.
function queryNext(elements, span) {
	const types = [...span.types]
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !types.length) {
		return [elements, types]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	for (let T = types[0]; types.length; types.shift(), T = types[0]) {
		if (Array.isArray(ref) && ref.length && ref[ref.length - 1] && ref[ref.length - 1].type) {
			ref = ref[ref.length - 1]
		}
		if (typeof ref === "string" || ref.type !== T || !areEqualJSON(omitKey(ref.props, "children"), span.props[T])) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	// Guard lastRef.props.children = toArray(ref); prevents
	// stack exceeded error:
	if (lastRef === ref) {
		return [elements, types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, types]
}

// Converts spans to intermediary elements.
function toElements(spans) {
	const elements = []
	for (const span of spans) {
		const [arr, types] = queryNext(elements, span)
		if (!types.length) {
			arr.push(span.props.children)
			continue
		}
		const element = {}
		let lastRef = element
		let ref = lastRef
		for (const T of types) {
			Object.assign(ref, {
				type: T,
				props: {
					...span.props[T],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = span.props.children
		arr.push(element)
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
