import JSONClone from "lib/JSON/JSONClone"
import JSONEqual from "lib/JSON/JSONEqual"
import obscure from "lib/Object/obscure"
import toArray from "lib/Array/toArray"

// // Queries intermediary React elements for the next parent
// // element and and non-nested types.
// function query(intermediary, { types }) {
// 	if (!intermediary.length || !types.length) {
// 		return [intermediary, types]
// 	}
// 	let lastRef = toArray(intermediary).slice(-1)[0]
// 	let ref = lastRef
// 	let x = 0
// 	let type = null
// 	for ([x, type] of types.entries()) {
// 		ref = toArray(ref).slice(-1)[0]
// 		if (typeof ref === "string" || ref.type !== type.type || !JSONEqual(obscure(ref.props, "children"), type.props)) {
// 			// No-op
// 			break
// 		}
// 		lastRef = ref
// 		ref = ref.props.children
// 	}
// 	if (lastRef === ref) {
// 		return [intermediary, types]
// 	}
// 	lastRef.props.children = toArray(lastRef.props.children)
// 	return [lastRef.props.children, types.slice(x)]
// }

// Queries intermediary React elements for the next parent
// element and and non-nested types.
function query(intermediary, { types }) {
	if (!intermediary.length || !types.length) {
		return [intermediary, types]
	}
	let lastRef = toArray(intermediary).slice(-1)[0]
	let ref = lastRef
	let x = 0
	for (; x < types.length; x++) {
		const type = types[x]
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== type.type || !JSONEqual(obscure(ref.props, "children"), type.props)) {
			// No-op
			break
		}
		lastRef = ref
		ref = ref.props.children
	}
	if (lastRef === ref) {
		return [intermediary, types]
	}
	lastRef.props.children = toArray(lastRef.props.children)
	return [lastRef.props.children, types.slice(x)]
}

// Creates an intermediary React element from an inline
// element and non-nested types.
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
				children: x + 1 < types.length ? {} : child.props.children,
			},
		})
		ref = ref.props.children
	}
	return element
}

// Converts children to intermediary React elements.
function toIntermediary(children) {
	const intermediary = []
	for (const each of children) {
		const [parent, types] = query(intermediary, each)
		parent.push(createElement(each, types))
	}
	return intermediary
}

export default toIntermediary
