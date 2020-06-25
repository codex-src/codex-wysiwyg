import must from "./index"

test("must", () => {
	expect(() => must(undefined)).toThrow()
	expect(() => must(false)).toThrow()
	expect(() => must(true)).not.toThrow()
	expect(() => must(-1)).toThrow()
	expect(() => must(0)).not.toThrow()
	expect(() => must("")).toThrow()
	expect(() => must("Hello, world!")).not.toThrow()
	expect(() => must(null)).toThrow()
	expect(() => must([])).not.toThrow()
	expect(() => must({})).not.toThrow()
	expect(() => must(() => {})).not.toThrow()
})
