import testForSelection from "./testForSelection"

// Gets x1, x2, el1, el2, ch1, and ch2.
//
// TODO: getVars -> getVariables
function getVariables(e) {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (testForSelection(e)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}
	const el1 = e.elements[x1]
	const el2 = e.elements[x2]
	const ch1 = el1.props.children
	const ch2 = el2.props.children
	return { x1, x2, el1, el2, ch1, ch2 }
}

export default getVariables
