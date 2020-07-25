import hash from "lib/x/hash"
import rangeIsCollapsed from "./index"

test("rangeIsCollapsed(...)", () => {
	const pos = {
		key: hash(),
		offset: 0,
	}
	const range = {
		start: pos,
		end: pos,
	}
	expect(rangeIsCollapsed(range)).toBeTruthy()
	range.end = { ...range.start }
	expect(rangeIsCollapsed(range)).toBeTruthy()
	range.end.key = hash()
	expect(rangeIsCollapsed(range)).not.toBeTruthy()
	range.end.offset = Math.floor(Math.random() * 10)
	expect(rangeIsCollapsed(range)).not.toBeTruthy()
})
