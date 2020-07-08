import JSONClone from "lib/JSONClone"

// Computes the offset of an array of spans at a range
// offset. Returns the the current offset or the next offset
// when spans are cut.
function offset(spans, offset) {
	if (!offset) {
		return 0
	} // else if (offset === -1) {
	// 	return spans.length
	// }
	let x = 0
	let each = null
	for ([x, each] of spans.entries()) {
		if (offset - each.text.length <= 0) {
			// No-op
			break
		}
		offset -= each.text.length
	}
	// Return the next offset:
	if (offset === each.text.length) {
		return x + 1
	}
	// Cut the current span and return the next offset:
	const current = {
		...JSONClone(each),
		text: each.text.slice(0, offset),
	}
	const next = {
		...JSONClone(each),
		text: each.text.slice(offset),
	}
	spans.splice(x, 1, current, next)
	return x + 1
}

export default offset
