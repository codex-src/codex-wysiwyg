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
function queryContainer(elements, span) {
	const types = [...span.types]
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !types.length) {
		return [elements, types]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	for (let T = types[0]; types.length; types.shift(), T = types[0]) {
		// console.log(ref)
		// ref = toArray(ref).slice(-1)[0]
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
	for (let x = 0; x < spans.length; x++) {
		const [container, types] = queryContainer(elements, spans[x]) // TODO: Change to span
		if (!types.length) {
			container.push(spans[x].props.children)
			continue
		}

		// const [container, types] = [elements, spans[x].types] // queryContainer(elements, spans[x])
		// if (!types.length) {
		// 	container.push(spans[x].props.children)
		// 	continue
		// }

		const element = {}
		let lastRef = element
		let ref = lastRef
		for (const T of types) {
			Object.assign(ref, {
				type: T,
				props: {
					...spans[x].props[T],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = spans[x].props.children
		container.push(element)
	}
	return elements
}

// Converts spans to React elements. Uses intermediary
// elements because React elements are read-only.
function toReact(spans) {
	const elements = toElements(spans)
	// console.log(spans, elements)
	const reactElements = toReactElements(elements)
	if (!reactElements.length) {
		return null
	}
	return reactElements
}

export default toReact
