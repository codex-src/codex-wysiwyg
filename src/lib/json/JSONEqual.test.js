import JSONEqual from "./JSONEqual"

test("JSONEqual(undefined, undefined)", () => {
	expect(JSONEqual(undefined, undefined)).toBeTruthy()
})
test("JSONEqual(null, null)", () => {
	expect(JSONEqual(null, null)).toBeTruthy()
})
test("JSONEqual({}, {})", () => {
	expect(JSONEqual({}, {})).toBeTruthy()
})
test("JSONEqual({ foo: 'bar' }, { foo: 'bar' })", () => {
	expect(JSONEqual({ foo: "bar" }, { foo: "bar" })).toBeTruthy()
})
test("JSONEqual({ foo: 'bar' }, { bar: 'baz' })", () => {
	expect(JSONEqual({ foo: "bar" }, { bar: "baz" })).not.toBeTruthy()
})
