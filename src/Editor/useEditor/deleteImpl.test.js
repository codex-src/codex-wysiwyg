import findIndex from "../../utils/findIndex"
import rangeIsCollapsed from "../../utils/rangeIsCollapsed"

// Deletes the current range.
function deleteImpl(e, dir, boundary) {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}

	const ch1 = e.elements[x1].props.children
	const ch2 = e.elements[x2].props.children

	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, findIndex(ch1, e.range.start.offset)),
		...ch2.slice(findIndex(ch2, e.range.end.offset)),
	)

	e.elements.splice(x1 + 1, x2 - x1)
}

export default deleteImpl
