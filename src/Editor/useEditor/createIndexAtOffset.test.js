import createIndexAtOffset from "./createIndexAtOffset"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("createIndexAtOffset(...)", () => {
	expect(createIndexAtOffset(children, 13)).toBe(2)
	expect(createIndexAtOffset(children, 12)).toBe(1)
	expect(createIndexAtOffset(children, 11)).toBe(2)
	expect(createIndexAtOffset(children, 10)).toBe(2)
	expect(createIndexAtOffset(children, 9)).toBe(2)
	expect(createIndexAtOffset(children, 8)).toBe(2)
	expect(createIndexAtOffset(children, 7)).toBe(0)
	expect(createIndexAtOffset(children, 6)).toBe(1)
	expect(createIndexAtOffset(children, 5)).toBe(1)
	expect(createIndexAtOffset(children, 4)).toBe(1)
	expect(createIndexAtOffset(children, 3)).toBe(1)
	expect(createIndexAtOffset(children, 2)).toBe(1)
	expect(createIndexAtOffset(children, 1)).toBe(1)
	expect(createIndexAtOffset(children, 0)).toBe(0)
	expect(createIndexAtOffset([], 0)).toBe(-1)
})
