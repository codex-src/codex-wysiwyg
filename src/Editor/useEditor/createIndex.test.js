import createIndex from "./createIndex"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("createIndex(...)", () => {
	expect(createIndex(children, 13)).toBe(3)
	expect(createIndex(children, 12)).toBe(2)
	expect(createIndex(children, 11)).toBe(2)
	expect(createIndex(children, 10)).toBe(2)
	expect(createIndex(children, 9)).toBe(2)
	expect(createIndex(children, 8)).toBe(2)
	expect(createIndex(children, 7)).toBe(1)
	expect(createIndex(children, 6)).toBe(1)
	expect(createIndex(children, 5)).toBe(1)
	expect(createIndex(children, 4)).toBe(1)
	expect(createIndex(children, 3)).toBe(1)
	expect(createIndex(children, 2)).toBe(1)
	expect(createIndex(children, 1)).toBe(1)
	expect(createIndex(children, 0)).toBe(0)
	expect(createIndex([], 0)).toBe(0)
})
