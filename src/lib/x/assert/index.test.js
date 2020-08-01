import assert from "./index"

test("assert(...)", () => {
	expect(() => assert(undefined)).toThrow()
	expect(() => assert(false)).toThrow()
	expect(() => assert(true)).not.toThrow()
	expect(() => assert(-1)).toThrow()
	expect(() => assert(0)).not.toThrow()
	expect(() => assert(1)).not.toThrow()
	expect(() => assert("")).toThrow()
	expect(() => assert("Hello, world!")).not.toThrow()
	expect(() => assert(null)).toThrow()
	expect(() => assert([])).not.toThrow()
	expect(() => assert({})).not.toThrow()
	expect(() => assert(() => {})).not.toThrow()
})
