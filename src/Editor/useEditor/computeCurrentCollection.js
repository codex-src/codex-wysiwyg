// Computes the offset of an array of spans at a range
// offset. Returns the the current offset or the next offset
// when spans are cut.
function offset(spans, offset) {
	if (!offset) {
		return 0
	}
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

// Computes the current collection.
function computeCurrentCollection(state) {
	const e1 = state.elements.findIndex(each => each.key === state.range[0].key)
	const e2 = state.range[0].key === state.range[1].key ? e1
		: state.elements.findIndex(each => each.key === state.range[1].key)

	const collection = []
	for (const each of state.elements.slice(e1, e2 + 1)) {
		const t1 = each === e1 ? state.range[0].offset : 0
		const t2 = each === e2 ? state.range[1].offset
			: each.props.spans.reduce((acc, each) => acc += each.text.length, 0)
		const s1 = offset(each.props.spans, t1)
		const s2 = offset(each.props.spans, t2)
		collection.push({
			element: each,
			spans: each.props.spans.slice(s1, s2),
		})
	}
	return collection
}

// e: [e1, e2],
// n: [n1, n2],
// s: [s1, s2],

export default computeCurrentCollection
