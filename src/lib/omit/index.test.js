import omit from "./index"

test("omit", () => {
	expect(omit({ a: 0 }, "a")).toEqual({})
	expect(omit({ a: 0, b: 0 }, "a")).toEqual({ b: 0 })
	expect(omit({ a: 0, b: 0, c: 0 }, "a")).toEqual({ b: 0, c: 0 })
})
