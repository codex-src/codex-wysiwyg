import JSONEqual from "./index"

test("JSONEqual(...)", () => {
	expect(JSONEqual(undefined, undefined)).toBeTruthy()
	expect(JSONEqual(null, null)).toBeTruthy()
	expect(JSONEqual({}, {})).toBeTruthy()
	expect(JSONEqual({ foo: "bar" }, { foo: "bar" })).toBeTruthy()
	expect(JSONEqual({ foo: "bar" }, { bar: "baz" })).not.toBeTruthy()
})
