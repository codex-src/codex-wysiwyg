import * as Range from "./index"
import hash from "lib/x/hash"

test("collapseStart(...)", () => {
	const id1 = hash()
	const id2 = hash()
	const range = {
		start: {
			key: id1,
			offset: 0,
		},
		end: {
			key: id2,
			offset: 0,
		},
		collapsed: false,
	}
	expect(Range.collapseStart(range)()).toEqual({
		start: {
			key: id1,
			offset: 0,
		},
		end: {
			key: id1,
			offset: 0,
		},
		collapsed: true,
	})
})

test("collapseEnd(...)", () => {
	const id1 = hash()
	const id2 = hash()
	const range = {
		start: {
			key: id1,
			offset: 0,
		},
		end: {
			key: id2,
			offset: 0,
		},
		collapsed: false,
	}
	expect(Range.collapseEnd(range)()).toEqual({
		start: {
			key: id2,
			offset: 0,
		},
		end: {
			key: id2,
			offset: 0,
		},
		collapsed: true,
	})
})
