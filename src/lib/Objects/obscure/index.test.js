import obscure from "./index"

test("obscure(...)", () => {
	expect(obscure({ foo: 0 }, "foo")).toEqual({})
	expect(obscure({ foo: 0, bar: 0 }, "foo")).toEqual({ bar: 0 })
	expect(obscure({ foo: 0, bar: 0, baz: 0 }, "foo")).toEqual({ bar: 0, baz: 0 })

	expect(() => obscure({}, "")).toThrow()
	expect(() => obscure({}, "foo")).toThrow()
})
