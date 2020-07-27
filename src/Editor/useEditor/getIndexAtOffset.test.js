import getIndexAtOffset from "./getIndexAtOffset"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("getIndexAtOffset(...)", () => {
	expect(getIndexAtOffset([], 0)).toBe(-1)
	expect(getIndexAtOffset(children, 0)).toBe(0)
	expect(getIndexAtOffset(children, 1)).toBe(0)
	expect(getIndexAtOffset(children, 2)).toBe(0)
	expect(getIndexAtOffset(children, 3)).toBe(0)
	expect(getIndexAtOffset(children, 4)).toBe(0)
	expect(getIndexAtOffset(children, 5)).toBe(0)
	expect(getIndexAtOffset(children, 6)).toBe(0)
	expect(getIndexAtOffset(children, 7)).toBe(0)
	expect(getIndexAtOffset(children, 8)).toBe(1)
	expect(getIndexAtOffset(children, 9)).toBe(1)
	expect(getIndexAtOffset(children, 10)).toBe(1)
	expect(getIndexAtOffset(children, 11)).toBe(1)
	expect(getIndexAtOffset(children, 12)).toBe(1)
	expect(getIndexAtOffset(children, 13)).toBe(2)
})
