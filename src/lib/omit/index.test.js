import omit from "./index"

test("omit({}, '') (throws)", () => {
	expect(() => omit({}, "")).toThrow()
})
test("omit({}, 'foo') (throws)", () => {
	expect(() => omit({}, "foo")).toThrow()
})
test("omit({ foo: 0 }, 'foo')", () => {
	expect(omit({ foo: 0 }, "foo")).toEqual({})
})
test("omit({ foo: 0, bar: 0 }, 'foo')", () => {
	expect(omit({ foo: 0, bar: 0 }, "foo")).toEqual({ bar: 0 })
})
test("omit({ foo: 0, bar: 0, baz: 0 }, 'foo')", () => {
	expect(omit({ foo: 0, bar: 0, baz: 0 }, "foo")).toEqual({ bar: 0, baz: 0 })
})
