import convTypesToArray from "./convTypesToArray"
import JSONEqual from "lib/JSON/JSONEqual"
import toArray from "lib/x/toArray"

// Compares whether props are equal.
function propsAreEqual(originalProps, typeProps) {
	const props = {
		...originalProps,
		children: undefined, // Obscures originalProps.children
	}
	return JSONEqual(props, typeProps)
}

// Queries the next parent element and non-nested types.
function queryNext(tchildren, { types }) {
	const typeArr = convTypesToArray(types)

	if (!tchildren.length || !typeArr.length) {
		return [tchildren, typeArr]
	}
	let lastRef = toArray(tchildren).slice(-1)[0]
	let ref = lastRef
	let x = 0
	for (; x < typeArr.length; x++) {
		const type = typeArr[x]

		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== type.type || !propsAreEqual(ref.props, type.props)) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	if (lastRef === ref) {
		return [tchildren, typeArr]
	}
	lastRef.props.children = toArray(lastRef.props.children)
	return [lastRef.props.children, typeArr.slice(x)]
}

// Creates a tree-shaped React element.
function createElement(child, types) {
	if (!types.length) {
		return child.props.children
	}
	const tchild = {}
	let ref = tchild
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
	return tchild
}

// Converts children to tree-shaped children.
function toTree(children) {
	const tchildren = []
	for (const each of children) {
		const [parentEl, types] = queryNext(tchildren, each)
		parentEl.push(createElement(each, types))
	}
	return tchildren
}

export default toTree
