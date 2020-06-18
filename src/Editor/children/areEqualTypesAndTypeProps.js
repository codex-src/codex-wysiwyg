import omitKey from "lib/omitKey"

// Returns whether two intermediary inline elements are
// equal in types and type-props.
function areEqualTypesAndTypeProps(el1, el2) {
	const ok = (
		JSON.stringify(el1.types) === JSON.stringify(el2.types) &&
		JSON.stringify(omitKey(el1.props, "children")) ===
			JSON.stringify(omitKey(el2.props, "children"))
	)
	return ok
}

export default areEqualTypesAndTypeProps
