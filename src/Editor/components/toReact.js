import omitKey from "lib/omitKey"
import React from "react"
import toArray from "lib/toArray"
import { typeMap } from "./typeInfo"

// Converts non-renderable React elements to renderable
// React elements.
function createElement(intermediary) {
	const reactElements = []
	for (const each of toArray(intermediary)) {
		if (typeof each === "string") {
			reactElements.push(each)
			continue
		}
		const { type: T, props } = each
		reactElements.push(React.createElement(typeMap[T], {
			key: reactElements.length,
			...props,
		}, createElement(props.children)))
	}
	// NOTE: Uses return null for
	// {toReact(children) || <br />} case
	if (!reactElements.length) {
		return null
	}
	return reactElements
}

// Searches for the most recent container that matches types
// and type-props.
function searchContainer(intermediary, { types, props }) {
	if (!intermediary.length || typeof intermediary[intermediary.length - 1] === "string") {
		return [intermediary, types]
	}
	let ref = intermediary[intermediary.length - 1]
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
		return [intermediary, types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, types.slice(x)]
}

// Converts spans to React elements. Non-renderable React
// elements are used as an intermediary step because
// renderable React elements are read-only.
function toReact(spans) {
	if (typeof spans === "string") {
		return spans
	}
	const intermediary = []
	for (const each of toArray(spans)) {
		if (!each.types.length) {
			intermediary.push(each.props.children)
			continue
		}
		const [container, types] = searchContainer(intermediary, each) // FIXME
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
	if (!intermediary.length) {
		return null
	}
	return createElement(intermediary)
}

export default toReact
