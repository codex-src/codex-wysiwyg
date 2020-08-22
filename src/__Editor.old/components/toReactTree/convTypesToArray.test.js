import convTypesToArray from "./convTypesToArray"

test("convTypesToArray(...)", () => {
	const types = {
		em: {},
		strong: {},
		code: {},
		strike: {},
		a: { href: "foo" },
	}
	expect(convTypesToArray(types)).toEqual([
		{ type: "code", props: {} },
		{ type: "a", props: { href: "foo" } },
		{ type: "strike", props: {} },
		{ type: "strong", props: {} },
		{ type: "em", props: {} },
	])
})
