import getIndexNonIdempotent from "./getIndexNonIdempotent"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("getIndexNonIdempotent(...)", () => {
	expect(getIndexNonIdempotent(children, 13)).toBe(3)
	expect(getIndexNonIdempotent(children, 12)).toBe(2)
	expect(getIndexNonIdempotent(children, 11)).toBe(2)
	expect(getIndexNonIdempotent(children, 10)).toBe(2)
	expect(getIndexNonIdempotent(children, 9)).toBe(2)
	expect(getIndexNonIdempotent(children, 8)).toBe(2)
	expect(getIndexNonIdempotent(children, 7)).toBe(1)
	expect(getIndexNonIdempotent(children, 6)).toBe(1)
	expect(getIndexNonIdempotent(children, 5)).toBe(1)
	expect(getIndexNonIdempotent(children, 4)).toBe(1)
	expect(getIndexNonIdempotent(children, 3)).toBe(1)
	expect(getIndexNonIdempotent(children, 2)).toBe(1)
	expect(getIndexNonIdempotent(children, 1)).toBe(1)
	expect(getIndexNonIdempotent(children, 0)).toBe(0)
	expect(getIndexNonIdempotent([], 0)).toBe(0)
})
