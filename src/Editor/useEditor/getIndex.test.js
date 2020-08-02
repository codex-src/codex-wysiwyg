import getIndex from "./getIndex"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("getIndex(...)", () => {
	// expect(getIndex([], 0)).toBe(-1)
	expect(getIndex(children, 0)).toBe(0)
	expect(getIndex(children, 1)).toBe(0)
	expect(getIndex(children, 2)).toBe(0)
	expect(getIndex(children, 3)).toBe(0)
	expect(getIndex(children, 4)).toBe(0)
	expect(getIndex(children, 5)).toBe(0)
	expect(getIndex(children, 6)).toBe(0)
	expect(getIndex(children, 7)).toBe(0)
	expect(getIndex(children, 8)).toBe(1)
	expect(getIndex(children, 9)).toBe(1)
	expect(getIndex(children, 10)).toBe(1)
	expect(getIndex(children, 11)).toBe(1)
	expect(getIndex(children, 12)).toBe(1)
	expect(getIndex(children, 13)).toBe(2)
})
