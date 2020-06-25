import omitKeys from "./index"

test("omitKeys", () => {
	expect(omitKeys({ a: 0 }, "a")).toEqual({})
	expect(omitKeys({ a: 0, b: 0 }, "a")).toEqual({ b: 0 })
	expect(omitKeys({ a: 0, b: 0 }, "a", "b")).toEqual({})
	expect(omitKeys({ a: 0, b: 0, c: 0 }, "a")).toEqual({ b: 0, c: 0 })
	expect(omitKeys({ a: 0, b: 0, c: 0 }, "a", "b")).toEqual({ c: 0 })
	expect(omitKeys({ a: 0, b: 0, c: 0 }, "a", "b", "c")).toEqual({})
})
