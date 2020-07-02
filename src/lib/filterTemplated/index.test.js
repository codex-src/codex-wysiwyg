import filterTemplated from "./index"

test("", () => {
	expect(filterTemplated("")).toBe("")
	expect(filterTemplated("a b c")).toBe("a b c")
	expect(filterTemplated(" a b c ")).toBe("a b c")
	expect(filterTemplated("\t a b c \t")).toBe("a b c")
	expect(filterTemplated("\n\t a b c \t\n")).toBe("a b c")
	expect(filterTemplated("undefined false null")).toBe("")
	expect(() => filterTemplated("[object Object]")).toThrow()
})
