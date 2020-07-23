import defer from "../../utils/children/defer"
import index from "../../utils/children/index"

// if (x1 !== x2) {
// 	e.elements.splice(x1 + 1, (x2 - x1) + 1)
// }

// Deletes the current range.
const deleteImpl = e => () => {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!e.range.collapsed()) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}
	const ch1 = e.elements[x1].props.children
	const ch2 = e.elements[x2].props.children

	// e.elements[x1].props.children = [
	// 	...ch1.slice(0, index(ch1, e.range.start.offset)),
	// 	...ch2.slice(index(ch2, e.range.end.offset)),
	// ]

	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, index(ch1, e.range.start.offset)),
		...ch2.slice(index(ch2, e.range.end.offset)),
	)
	while (x2 !== x1) {
		e.elements.splice(x2, 1)
		x2--
	}
	defer(ch1) // TODO?
}

export default deleteImpl