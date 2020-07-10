import JSONEqual from "./JSONEqual"

test("JSONEqual", () => {
	expect(JSONEqual(undefined, undefined)).toBeTruthy()
	expect(JSONEqual(null, null)).toBeTruthy()
	expect(JSONEqual({}, {})).toBeTruthy()
	expect(JSONEqual({ a: "b" }, { a: "b" })).toBeTruthy()
	expect(JSONEqual({ a: "b" }, { b: "a" })).not.toBeTruthy()
	expect(JSONEqual({ a: "b", b: "a" }, { a: "b", b: "a" })).toBeTruthy()
	expect(JSONEqual({ a: "b", b: "a" }, { b: "a", a: "b" })).not.toBeTruthy()
})
