import defer from "./defer"

test("(empty)", () => {
	const children = []
	defer(children)
	expect(children).toEqual([])
})

test("[Hello, ][<code>world</code>][!]", () => {
	const children = [
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "code": {} }, props: { children: "world" } },
		{ types: {}, props: { children: "!" } },
	]
	defer(children)
	expect(children).toEqual([
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "code": {} }, props: { children: "world" } },
		{ types: {}, props: { children: "!" } },
	])
})

test("[Hello, ][<a href='foo'>foo</a>][<a href='foo'>foo</a>][!]", () => {
	const children = [
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "a": { href: "foo" } }, props: { children: "foo" } },
		{ types: { "a": { href: "foo" } }, props: { children: "foo" } },
		{ types: {}, props: { children: "!" } },
	]
	defer(children)
	expect(children).toEqual([
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "a": { href: "foo" } }, props: { children: "foofoo" } },
		{ types: {}, props: { children: "!" } },
	])
})

test("[Hello, ][<a href='foo'>foo</a>][<a href='bar'>bar</a>][!]", () => {
	const children = [
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "a": { href: "foo" } }, props: { children: "foo" } },
		{ types: { "a": { href: "bar" } }, props: { children: "bar" } },
		{ types: {}, props: { children: "!" } },
	]
	defer(children)
	expect(children).toEqual([
		{ types: {}, props: { children: "Hello, " } },
		{ types: { "a": { href: "foo" } }, props: { children: "foo" } },
		{ types: { "a": { href: "bar" } }, props: { children: "bar" } },
		{ types: {}, props: { children: "!" } },
	])
})
