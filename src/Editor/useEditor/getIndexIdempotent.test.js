import getIndexIdempotent from "./getIndexIdempotent"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("getIndexIdempotent(...)", () => {
	// expect(getIndexIdempotent([], 0)).toBe(-1)
	expect(getIndexIdempotent(children, 0)).toBe(0)
	expect(getIndexIdempotent(children, 1)).toBe(0)
	expect(getIndexIdempotent(children, 2)).toBe(0)
	expect(getIndexIdempotent(children, 3)).toBe(0)
	expect(getIndexIdempotent(children, 4)).toBe(0)
	expect(getIndexIdempotent(children, 5)).toBe(0)
	expect(getIndexIdempotent(children, 6)).toBe(0)
	expect(getIndexIdempotent(children, 7)).toBe(0)
	expect(getIndexIdempotent(children, 8)).toBe(1)
	expect(getIndexIdempotent(children, 9)).toBe(1)
	expect(getIndexIdempotent(children, 10)).toBe(1)
	expect(getIndexIdempotent(children, 11)).toBe(1)
	expect(getIndexIdempotent(children, 12)).toBe(1)
	expect(getIndexIdempotent(children, 13)).toBe(2)
})
