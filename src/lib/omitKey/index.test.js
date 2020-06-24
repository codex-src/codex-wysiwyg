import omitKey from "./index"

test("omitKey", () => {
	expect(omitKey({ a: null }, "a")).toEqual({})
	expect(omitKey({ a: null, b: null }, "b")).toEqual({ a: null })
	expect(omitKey({ a: null, b: null, c: null }, "c")).toEqual({ a: null, b: null })
})
