import testForSelection from "./testForSelection"
import hash from "lib/x/hash"
import JSONClone from "lib/JSON/JSONClone"

const initialState = {
	range: {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
	},
}

function deepCopy() {
	return JSONClone(initialState)
}

test("testForSelection(...)", () => {
	const state = deepCopy()
	state.range.start = {
		id: hash(),
		offset: 0,
	}
	state.range.end = state.range.start
	expect(testForSelection(state)).not.toBeTruthy()
	state.range.end = { ...state.range.start }
	expect(testForSelection(state)).not.toBeTruthy()
	state.range.end.key = hash()
	expect(testForSelection(state)).toBeTruthy()
	state.range.end.key = state.range.start.key // Revert
	expect(testForSelection(state)).not.toBeTruthy()
	state.range.end.offset = 10
	expect(testForSelection(state)).toBeTruthy()
})
