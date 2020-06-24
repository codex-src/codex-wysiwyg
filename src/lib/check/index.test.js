import check from "./index"

test("check", () => {
	expect(() => check(undefined)).toThrow()
	expect(() => check(false)).toThrow()
	expect(() => check(true)).not.toThrow()
	expect(() => check(-1)).toThrow()
	expect(() => check(0)).not.toThrow()
	expect(() => check("")).toThrow()
	expect(() => check("Hello, world!")).not.toThrow()
	expect(() => check(null)).toThrow()
	expect(() => check([])).not.toThrow()
	expect(() => check({})).not.toThrow()
	expect(() => check(() => {})).not.toThrow()
})
