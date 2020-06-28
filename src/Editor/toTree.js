import areEqualJSON from "lib/areEqualJSON"
import omit from "lib/omit"
import toArray from "lib/toArray"

// Queries a tree for a subtree and non-nested types.
function query(tree, span) {
	const types = [...span.types]
	if (!tree.length || !types.length) {
		return [tree, types]
	}
	let lastRef = tree[tree.length - 1]
	let ref = lastRef
	for (let type = types[0]; types.length; type = types[0]) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== type || !areEqualJSON(omit(ref.props, "children"), span[type] || {})) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
		types.shift()
	}
	// No shared types; push types to tree:
	if (lastRef === ref) {
		return [tree, types]
	}
	lastRef.props.children = toArray(ref)
	return [lastRef.props.children, types]
}

// Converts an array of spans to a tree data structure.
export function toTree(spans) {
	const tree = []
	for (const span of spans) {
		const [subtree, types] = query(tree, span)
		if (!types.length) {
			subtree.push(span.text)
			continue
		}
		const next = {}
		let lastRef = next
		let ref = lastRef
		for (const type of types) {
			Object.assign(ref, {
				type,
				props: {
					...span[type],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = span.text
		subtree.push(next)
	}
	return tree
}

export default toTree
