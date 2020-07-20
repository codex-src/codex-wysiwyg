import tmpl from "./tmpl"

test("tmpl!...", () => {
	expect(tmpl``).toBe("")
	expect(tmpl`foo bar`).toBe("foo bar")
	expect(tmpl`
		foo
		bar
	`).toBe("foo bar")
	expect(tmpl`${"foo"} ${"bar"}`).toBe("foo bar")
	expect(tmpl`
		${"foo"}
		${"bar"}
	`).toBe("foo bar")
	expect(tmpl`foo ${"bar"} baz ${"qux"}`).toBe("foo bar baz qux")
	expect(tmpl`
		foo
		${"bar"}
		baz
		${"qux"}
	`).toBe("foo bar baz qux")
	expect(tmpl`foo ${"bar"} baz ${"qux"} quux ${"quuz"} corge ${"grault"} garply ${"waldo"} fred ${"plugh"} xyzzy`).toBe("foo bar baz qux quux quuz corge grault garply waldo fred plugh xyzzy")
	expect(tmpl`
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

	expect(tmpl`${undefined} ${false} ${null}`).toBe("")
	expect(tmpl`
		${undefined}
		${false}
		${null}
	`).toBe("")
	expect(() => tmpl`${{}}`).toThrow()
	expect(() => tmpl`
		${{}}
	`).toThrow()
})
