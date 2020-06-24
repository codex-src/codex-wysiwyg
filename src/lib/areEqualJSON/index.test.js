import areEqualJSON from "./index"

test("areEqualJSON", () => {
	// NOTE: Use expect(...).toBe(...) not
	// expect(...).toEqual(...)
	expect(areEqualJSON(undefined, undefined)).toBe(true)
	expect(areEqualJSON(null, null)).toBe(true)
	expect(areEqualJSON({}, {})).toBe(true)
	expect(areEqualJSON({ a: "b" }, { a: "b" })).toBe(true)
	expect(areEqualJSON({ a: "b", b: "a" }, { b: "a", a: "b" })).toBe(false)
})
