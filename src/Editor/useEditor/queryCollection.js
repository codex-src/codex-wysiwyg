import offset from "./offset"

// Queries the current range for a normalized collection
// (map) of elements and spans.
//
// TODO (1): Add support for inline offsets?
// TODO (2): Add support for nodes?
function queryCollection(state) {
	const e1 = state.elements.findIndex(each => each.key === state.range[0].key)
	const e2 = state.elements.findIndex(each => each.key === state.range[1].key)

	// Query the current collection:
	const collection = []
	for (let [x, each] of state.elements.slice(e1, e2 + 1).entries()) {
		x += e1

		// Query text offsets:
		const t1 = x === e1 ? state.range[0].offset : 0
		const t2 = x === e2 ? state.range[1].offset
			: each.props.spans.reduce((acc, each) => acc += each.text.length, 0)
		// Query span offsets:
		const s1 = offset(each.props.spans, t1)
		const s2 = offset(each.props.spans, t2)
		collection.push({
			ref: each, // TODO: Rename to element?
			spans: each.props.spans.slice(s1, s2),
		})
	}
	return collection
}

export default queryCollection
