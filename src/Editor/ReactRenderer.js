import React from "react"
import toReact from "./toReact"

// Computes an array of types and type map for a pseudo-
// React element.
function computeTypeInfo(element) {
	const types = []
	const typeMap = {}
	if (typeof element === "string") {
		return [types, typeMap]
	}
	let ref = element.type !== undefined && // NOTE: "type" can be 0
		element
	while (ref) {
		types.push(ref.type)
		typeMap[ref.type] = ref
		ref = ref.props.children.type !== undefined && // NOTE: "type" can be 0
			ref.props.children
	}
	return [types, typeMap]
}

// Decorates pseudo-React elements; sets element.pos to
// "at-start", "at-center", or "at-end".
function decoratePos(elements) {
	for (let x = 0; x < elements.length; x++) {
		if (!x || typeof elements[x - 1] === "string" || typeof elements[x] === "string") {
			// No-op
			continue
		}
		const [types1, typeMap1] = computeTypeInfo(elements[x - 1])
		const [types2, typeMap2] = computeTypeInfo(elements[x])
		const common = types1.filter(a => types2.some(b => a === b))
		for (const type of common) {
			typeMap1[type].props.pos = !typeMap1[type].props.pos ? "at-start" : "at-center"
			typeMap2[type].props.pos = "at-end"
		}
	}
}

// Parses pseudo-React elements from spans.
function parseSpans(spans) {
	const elements = []
	for (const span of spans) {
		if (!span.formats.length) {
			elements.push(span.content)
			continue
		}
		const element = {}
		let lastRef = element
		let ref = lastRef
		for (const format of span.formats.sort()) {
			Object.assign(ref, { // <- lastRef
				type: format,
				props: {
					...span[format],
					children: {}, // <- ref
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = span.content
		elements.push(element)
	}
	decoratePos(elements)
	return elements
}

const ReactRenderer = ({ state, dispatch, renderableMap }) => (
	state.elements.map(({ type: T, spans, ...props }) => (
		React.createElement(T, {
			key: props.uuid,
			...props,
		}, toReact(parseSpans(spans), renderableMap))
	))
)

export default ReactRenderer
