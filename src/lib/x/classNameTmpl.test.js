import classNameTmpl from "./classNameTmpl"

test("classNameTmpl!...", () => {
	expect(classNameTmpl``).toBe("")
	expect(classNameTmpl`foo bar`).toBe("foo bar")
	expect(classNameTmpl`
		foo
		bar
	`).toBe("foo bar")
	expect(classNameTmpl`${"foo"} ${"bar"}`).toBe("foo bar")
	expect(classNameTmpl`
		${"foo"}
		${"bar"}
	`).toBe("foo bar")
	expect(classNameTmpl`foo ${"bar"} baz ${"qux"}`).toBe("foo bar baz qux")
	expect(classNameTmpl`
		foo
		${"bar"}
		baz
		${"qux"}
	`).toBe("foo bar baz qux")
	expect(classNameTmpl`foo ${"bar"} baz ${"qux"} quux ${"quuz"} corge ${"grault"} garply ${"waldo"} fred ${"plugh"} xyzzy`).toBe("foo bar baz qux quux quuz corge grault garply waldo fred plugh xyzzy")
	expect(classNameTmpl`
		foo
		${"bar"}
		baz
		${"qux"}
		quux
		${"quuz"}
		corge
		${"grault"}
		garply
		${"waldo"}
		fred
		${"plugh"}
		xyzzy
	`).toBe("foo bar baz qux quux quuz corge grault garply waldo fred plugh xyzzy")

	expect(classNameTmpl`${undefined} ${false} ${null}`).toBe("")
	expect(classNameTmpl`
		${undefined}
		${false}
		${null}
	`).toBe("")
	expect(() => classNameTmpl`${{}}`).toThrow()
	expect(() => classNameTmpl`
		${{}}
	`).toThrow()
})
