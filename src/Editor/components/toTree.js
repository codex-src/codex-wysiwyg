import areEqualJSON from "lib/areEqualJSON"
import JSONClone from "lib/JSONClone"
import omit from "lib/omit"
import toArray from "lib/toArray"

// Queries the next subtree and non-nested types.
function queryNext(tree, span) {
	const types = [...span.types]
	if (!tree.length || !types.length) {
		return [tree, types]
	}
	// Reference the previously current and current elements:
	let lastRef = toArray(tree).slice(-1)[0]
	let ref = lastRef
	for (let T = types[0]; types.length; types.shift(), T = types[0]) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== T || !areEqualJSON(omit(ref.props, "children"), span[T] || {})) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	if (lastRef === ref) {
		return [tree, types]
	}
	lastRef.props.children = toArray(lastRef.props.children)
	return [lastRef.props.children, types]
}

// Creates an element from a span and non-nested types.
function createElement(span, types) {
	const element = {}
	if (!types.length) {
		return span.text
	}
	// Reference the current element:
	let ref = element
	for (const [x, T] of types.entries()) {
		Object.assign(ref, {
			type: T,
			props: {
				...span[T],
				children: x + 1 < types.length ? {}
					: span.text,
			},
		})
		ref = ref.props.children
	}
	return element
}

// Converts an array of spans to a tree data structure.
function toTree(spans) {
	const tree = []
	for (const each of spans) {
		const [subtree, types] = queryNext(tree, each)
		subtree.push(createElement(each, types))
	}
	return tree
}

export default toTree
