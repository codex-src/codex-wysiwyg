import omit from "./index"

test("omit(...)", () => {
	expect(omit({ foo: 0 }, "foo")).toEqual({})
	expect(omit({ foo: 0, bar: 0 }, "foo")).toEqual({ bar: 0 })
	expect(omit({ foo: 0, bar: 0, baz: 0 }, "foo")).toEqual({ bar: 0, baz: 0 })

	expect(() => omit({}, "")).toThrow()
	expect(() => omit({}, "foo")).toThrow()
})
