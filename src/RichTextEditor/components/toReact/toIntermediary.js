import JSONEqual from "lib/JSON/JSONEqual"
import toArray from "lib/Array/toArray"

// Compares rendered and non-rendered props.
function propsAreEqual(ref, tprops) {
	const rprops = { ...ref.props, children: undefined }
	return JSONEqual(rprops, tprops || {})
}

// Queries intermediary React elements for the next
// container and non-nested types.
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
		if (typeof ref === "string" || ref.type !== type.type || !propsAreEqual(ref.props, type.props)) {
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

// Creates an intermediary React element.
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
