// Tests for the presence of a selection. A selection means
// range keys and or offsets are different.
function testForSelection(state) {
	const ok = (
		state.range.start.key !== state.range.end.key ||
		state.range.start.offset !== state.range.end.offset
	)
	return ok
}

export default testForSelection
