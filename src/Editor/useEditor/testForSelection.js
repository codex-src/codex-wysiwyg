// Tests a state for the presence of a selection.
function testForSelection(state) {
	const ok = (
		state.range.start.key !== state.range.end.key ||
		state.range.start.offset !== state.range.end.offset
	)
	return ok
}

export default testForSelection
