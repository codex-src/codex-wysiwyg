// Tests whether the current range is collapsed.
function collapsed(state) {
	const ok = (
		state.range.start === state.range.end ||
		(state.range.start.key === state.range.end.key &&
			state.range.start.offset === state.range.end.offset)
	)
	return ok
}

export default collapsed
