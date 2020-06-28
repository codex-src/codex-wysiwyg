import areEqualJSON from "lib/areEqualJSON"
import omit from "lib/omit"
import toArray from "lib/toArray"

// Queries the next subtree and non-nested types.
function queryNextSubtreeAndTypes(tree, span) {
	const types = [...span.types]
	if (!tree.length || !types.length) {
		return [tree, types]
	}
	let lastRef = tree[tree.length - 1]
	let ref = lastRef
	for (let T = types[0]; types.length; T = types[0]) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== T || !areEqualJSON(omit(ref.props, "children"), span[T] || {})) {
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
	for (const each of spans) {
		const [subtree, types] = queryNextSubtreeAndTypes(tree, each)
		if (!types.length) {
			subtree.push(each.text)
			continue
		}
		const next = {}
		let lastRef = next
		let ref = lastRef
		for (const T of types) {
			Object.assign(ref, {
				type: T,
				props: {
					...each[T],
					children: {},
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = each.text
		subtree.push(next)
	}
	return tree
}

export default toTree
