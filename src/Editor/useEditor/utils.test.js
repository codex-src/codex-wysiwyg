import hash from "lib/x/hash"

import { // Unsorted
	collapse,
	render,
} from "./utils"

test("collapse(...)", () => {
	const state = {
		range: {
			start: {
				key: hash(),
				offset: 0,
			},
			end: {
				key: hash(),
				offset: 0,
			},
		},
	}
	collapse(state)
	expect(state.range.start).toBe(state.range.end)    // Shallowly compares
	expect(state.range.start).toEqual(state.range.end) // Deeply compares
})

test("render(...)", () => {
	const state = {
		shouldRerender: 0,
	}
	render(state)
	expect(state.shouldRerender).toBe(1)
})
