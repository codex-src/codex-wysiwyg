import tabSize from "./index"

test("tabSize(...)", () => {
	expect(tabSize(2)).toEqual({
		MozTabSize: 2,
		tabSize: 2,
	})
})
