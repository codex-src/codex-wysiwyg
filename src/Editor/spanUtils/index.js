import * as Types from "../Types"

// // Returns the span and character offsets for a span and a
// // range component offset.
// function span_offsets(spans, offset) { // TODO
// 	let x = 0
// 	for (; x < spans.length; x++) {
// 		if (offset - spans[x].text.length <= 0) {
// 			return [x, offset]
// 		}
// 		offset -= spans[x].text.length
// 	}
// 	return null
// }

// Compares the sort order of types on Types.sortOrder.
function compareSortOrder(T1, T2) {
	const x1 = Types.sortOrder[T1]
	const x2 = Types.sortOrder[T2]
	return x1 - x2
}

// TODO: Add repair or merge?
const spanUtils = {
	// Sorts the types of an array of spans.
	sort(spans) {
		for (const each of spans) {
			each.types.sort(compareSortOrder)
		}
	},
}

export default spanUtils
