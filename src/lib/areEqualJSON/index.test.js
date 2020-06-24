import areEqualJSON from "./index"

test("areEqualJSON", () => {
	expect(areEqualJSON(undefined, undefined)).toBeTruthy()
	expect(areEqualJSON(null, null)).toBeTruthy()
	expect(areEqualJSON({}, {})).toBeTruthy()
	expect(areEqualJSON({ a: "b" }, { a: "b" })).toBeTruthy()
	expect(areEqualJSON({ a: "b" }, { b: "a" })).not.toBeTruthy()
	expect(areEqualJSON({ a: "b", b: "a" }, { a: "b", b: "a" })).toBeTruthy()
	expect(areEqualJSON({ a: "b", b: "a" }, { b: "a", a: "b" })).not.toBeTruthy()
})
