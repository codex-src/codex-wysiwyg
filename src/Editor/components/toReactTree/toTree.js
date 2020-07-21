import JSONEqual from "lib/JSON/JSONEqual"
import toArray from "lib/x/toArray"

// Compares props.
function propsAreEqual(pseudo, typeProps) {
	const props = { ...pseudo.props, children: undefined }
	return JSONEqual(props, typeProps || {})
}

// Queries the next parent element and types.
function queryNext(tree, { types }) {
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

// Creates a pseudo React element.
function createElement(child, types) {
	if (!types.length) {
		return child.props.children
	}
	const pseudo = {}
	let ref = pseudo
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
	return pseudo
}

// Converts children to tree-shaped children.
function toTree(children) {
	const tree = []
	for (const each of children) {
		const [parentElement, types] = queryNext(tree, each)
		parentElement.push(createElement(each, types))
	}
	return tree
}

export default toTree
