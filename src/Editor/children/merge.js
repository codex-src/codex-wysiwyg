import omitKey from "lib/omitKey"

// Returns whether two intermediary elements are equal in
// types and type-props.
function areEqualTypesAndTypeProps(el1, el2) {
	const ok = (
		JSON.stringify(el1.types) === JSON.stringify(el2.types) &&
		JSON.stringify(omitKey(el1.props, "children")) ===
			JSON.stringify(omitKey(el2.props, "children"))
	)
	return ok
}

// Merges children that share types and type-props.
function merge(children) {
	for (let x = 0; x < children.length; x++) {
		if (x - 1 >= 0 && areEqualTypesAndTypeProps(children[x - 1], children[x])) {
			children.splice(x - 1, 2, {
				...children[x - 1],
				props: {
					...children[x - 1].props,
					children: children[x - 1].props.children + children[x].props.children,
				},
			})
			continue
		}
	}
	return children
}

export default merge
