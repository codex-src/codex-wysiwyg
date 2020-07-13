import InlineElement from "../../../model/Editor/InlineElement"
import JSONClone from "lib/json/JSONClone"

// Splices children at an arbitrary offset. If children were
// spliced, the subsequent index is returned.
function splice(children, offset) {
	// At the start:
	if (!offset) {
		return 0
	}
	let x = 0
	let each = null
	for ([x, each] of children.entries()) {
		if (offset - each.value.length <= 0) {
			// No-op
			break
		}
		offset -= each.value.length
	}
	// At the end:
	if (offset === each.value.length) {
		return x + 1
	}
	// In-between:
	const start = new InlineElement({ ...each, value: each.value.slice(0, offset) })
	const end = new InlineElement({ ...each, value: each.value.slice(offset) })
	children.splice(x, 1, start, end)
	return x + 1
}

export default splice

// const start = new InlineElement({
// 	...each,
// 	value: each.value.slice(0, offset),
// })
// const end = new InlineElement({
// 	...each,
// 	value: each.value.slice(offset),
// })
