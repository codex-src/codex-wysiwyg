import * as Range from "./Range"
import newHash from "lib/x/newHash"

test("collapseStart(...)", () => {
	const k1 = newHash()
	const k2 = newHash()
	const range = {
		start: {
			key: k1,
			offset: 0,
		},
		end: {
			key: k2,
			offset: 0,
		},
		collapsed: false,
	}
	expect(Range.collapseStart(range)()).toEqual({
		start: {
			key: k1,
			offset: 0,
		},
		end: {
			key: k1,
			offset: 0,
		},
		collapsed: true,
	})
})

test("collapseEnd(...)", () => {
	const k1 = newHash()
	const k2 = newHash()
	const range = {
		start: {
			key: k1,
			offset: 0,
		},
		end: {
			key: k2,
			offset: 0,
		},
		collapsed: false,
	}
	expect(Range.collapseEnd(range)()).toEqual({
		start: {
			key: k2,
			offset: 0,
		},
		end: {
			key: k2,
			offset: 0,
		},
		collapsed: true,
	})
})
