import offset from "./offset"

// State function; queries the current collection.
const queryCollection = state => () => {
	const e1 = state.elements.findIndex(each => each.key === state.range[0].key)
	const e2 = state.elements.findIndex(each => each.key === state.range[1].key)

	const cache = []
	for (let [x, each] of state.elements.slice(e1, e2 + 1).entries()) {
		x += e1
		// Text offsets:
		const t1 = x === e1 ? state.range[0].offset : 0
		const t2 = x === e2 ? state.range[1].offset
			: each.props.spans.reduce((acc, each) => acc += each.text.length, 0)
		// Span offsets:
		const s1 = offset(each.props.spans, t1)
		const s2 = offset(each.props.spans, t2)
		// Push:
		cache.push({
			ref: each, // TODO: Rename to element?
			spans: each.props.spans.slice(s1, s2),
		})
	}
	return cache
}

export default queryCollection
