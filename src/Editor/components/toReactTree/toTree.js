import JSONEqual from "lib/JSON/JSONEqual"
import toArray from "lib/x/toArray"

// Compares rendered and non-rendered props.
function propsAreEqual(ref, tprops) {
	const rprops = { ...ref.props, children: undefined }
	return JSONEqual(rprops, tprops || {})
}

// Queries a tree-shaped data structure for the next parent
// element and non-nested types.
function queryParentElementAndTypes(tree, { types }) {
	if (!tree.length || !types.length) {
		return [tree, types]
	}
	let lastRef = toArray(tree).slice(-1)[0]
	let ref = lastRef
	let x = 0
	for (; x < types.length; x++) {
		const type = types[x]
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== type.type || !propsAreEqual(ref.props, type.props)) {
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
	return [lastRef.props.children, types.slice(x)]
}

// Creates a non-renderable React element.
function createElement(child, types) {
	if (!types.length) {
		return child.props.children
	}
	const element = {}
	let ref = element
	for (const [x, { type, props }] of types.entries()) {
		Object.assign(ref, {
			type,
			props: {
				...props,
				children: x + 1 < types.length ? {}
					: child.props.children,
			},
		})
		ref = ref.props.children
	}
	return element
}

// Converts children to a tree-shaped data structure.
function toTree(children) {
	const tree = []
	for (const each of children) {
		const [parentElement, types] = queryParentElementAndTypes(tree, each)
		parentElement.push(createElement(each, types))
	}
	return tree
}

export default toTree
