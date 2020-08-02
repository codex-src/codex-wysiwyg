import getMutableIndex from "./getMutableIndex"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("getMutableIndex(...)", () => {
	expect(getMutableIndex(children, 13)).toBe(3)
	expect(getMutableIndex(children, 12)).toBe(2)
	expect(getMutableIndex(children, 11)).toBe(2)
	expect(getMutableIndex(children, 10)).toBe(2)
	expect(getMutableIndex(children, 9)).toBe(2)
	expect(getMutableIndex(children, 8)).toBe(2)
	expect(getMutableIndex(children, 7)).toBe(1)
	expect(getMutableIndex(children, 6)).toBe(1)
	expect(getMutableIndex(children, 5)).toBe(1)
	expect(getMutableIndex(children, 4)).toBe(1)
	expect(getMutableIndex(children, 3)).toBe(1)
	expect(getMutableIndex(children, 2)).toBe(1)
	expect(getMutableIndex(children, 1)).toBe(1)
	expect(getMutableIndex(children, 0)).toBe(0)
	expect(getMutableIndex([], 0)).toBe(0)
})
