import JSONEqual from "lib/json/JSONEqual"
import omit from "lib/omit"
import toArray from "./toArray"

// Queries intermediary React elements for the next
// container and non-nested types.
function query(intermediary, { types, props }) {
	if (!intermediary.length || !types.length) {
		return [intermediary, types]
	}
	let lastRef = toArray(intermediary).slice(-1)[0]
	let ref = lastRef
	for (let T = types[0]; types.length; types.shift(), T = types[0]) {
		ref = toArray(ref).slice(-1)[0]
		if (typeof ref === "string" || ref.type !== T || !JSONEqual(omit(ref.props, "children"), props)) {
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
	return [lastRef.props.children, types]
}

// Creates an intermediary React element from an inline
// element and non-nested types.
function createElement(child, types) {
	if (!types.length) {
		return child.value
	}
	const element = {}
	let ref = element
	for (const [x, T] of types.entries()) {
		Object.assign(ref, {
			type: T,
			props: {
				...child.props[T],
				children: x + 1 < types.length ? {}
					: child.value,
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
		const [container, types] = query(intermediary, each)
		container.push(createElement(each, types))
	}
	return intermediary
}

export default toIntermediary
