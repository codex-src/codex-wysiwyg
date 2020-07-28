import must from "lib/x/must"

// Tests for a selection. A selection can mean range keys
// and or offsets are different.
function testForSelection(state) {
	must(typeof state === "object" && typeof state.range === "object") // TODO: Remove

	const ok = (
		state.range.start.key !== state.range.end.key ||
		state.range.start.offset !== state.range.end.offset
	)
	return ok
}

export default testForSelection
