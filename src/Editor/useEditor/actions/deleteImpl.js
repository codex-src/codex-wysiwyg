import collapsed from "../../utils/children/collapsed"
import defer from "../../utils/children/defer"
import index from "../../utils/children/index"

// Deletes the current range.
const deleteImpl = e => () => {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!collapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}
	const ch1 = e.elements[x1].props.children
	const ch2 = e.elements[x2].props.children
	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, index(ch1, e.range.start.offset)),
		...ch2.slice(index(ch2, e.range.end.offset)),
	)
	while (x2 !== x1) { // Iterates backwards
		e.elements.splice(x2, 1)
		x2--
	}
	defer(ch1)
}

export default deleteImpl
