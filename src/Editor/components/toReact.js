import areEqualJSON from "lib/areEqualJSON"
import omitKeys from "lib/omitKeys"
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
		const { type, props } = each
		reactElements.push(React.createElement(typeMap[type], {
			key: reactElements.length,
			...props,
		}, toReactElements(props.children)))
	}
	return reactElements
}

// Queries the next intermediary element array and types.
function queryNextAndTypes(elements, span) {
	const types = [...span.types]
	if (!elements.length || typeof elements[elements.length - 1] === "string" || !types.length) {
		return [elements, types]
	}
	let lastRef = elements[elements.length - 1]
	let ref = lastRef
	for (let type = types[0]; types.length; types.shift(), type = types[0]) {
		if (Array.isArray(ref) && ref.length && ref[ref.length - 1] && ref[ref.length - 1].type) {
			ref = ref[ref.length - 1]
		}
		// https://github.com/codex-src/codex-wysiwyg/commit/ec83e7fd6ae5a7a4ed2c6145ba84f1b823108447
		if (typeof ref === "string" || ref.type !== type || !areEqualJSON(omitKeys(ref.props, "type", "children"), span.props[type])) {
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
	for (const span of spans) { // Do not use "each"; too confusing
		const [next, types] = queryNextAndTypes(elements, span)
		if (!types.length) {
			next.push(span.props.children)
			continue
		}
		const element = {}
		let lastRef = element
		let ref = lastRef
		for (const type of types) { // Do not use "each"; too confusing
			Object.assign(ref, {
				type,
				props: {
					type, // Passes as a prop
					...span.props[type],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = span.props.children
		next.push(element)
	}
	return elements
}

// Converts spans to React elements. Uses intermediary
// elements because React elements are read-only.
function toReact(spans) {
	const elements = toElements(spans)
	const reactElements = toReactElements(elements)
	if (!reactElements.length) {
		return null // Uses null for {toReact(children) || <br />}
	}
	return reactElements
}

export default toReact
