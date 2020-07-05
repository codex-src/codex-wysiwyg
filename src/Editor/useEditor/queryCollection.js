import offset from "./offset"

// Queries the current range as a collection. A collection
// is an array of normalized elements and spans.
function queryCollection(state) {
	const e1 = state.elements.findIndex(each => each.key === state.range[0].key)
	const e2 = state.elements.findIndex(each => each.key === state.range[1].key)

	const collection = []
	for (let [x, each] of state.elements.slice(e1, e2 + 1).entries()) {
		x += e1
		// Text offsets:
		const t1 = x === e1 ? state.range[0].offset : 0
		const t2 = x === e2 ? state.range[1].offset
			: each.props.spans.reduce((acc, each) => acc += each.text.length, 0)
		// Span offsets:
		const s1 = offset(each.props.spans, t1)
		const s2 = offset(each.props.spans, t2)
		collection.push({
			refs: {
				element: each,
				spans: each.props.spans.slice(s1, s2),
			},
			offsets: {
				element: x,
				spans: [s1, s2],
			},
		})
	}
	return collection
}

export default queryCollection
