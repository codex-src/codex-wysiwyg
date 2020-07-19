import concat from "./concat"

test("(empty)", () => {
	const children = []
	concat(children)
	expect(children).toEqual([])
})

test("[Hello, world!]", () => {
	const children = [
		{ types: [], props: { children: "Hello, world!" } },
	]
	concat(children)
	expect(children).toEqual([
		{ types: [], props: { children: "Hello, world!" } },
	])
})

test("[H][e][l][l][o][,][ ][w][o][r][l][d][!]", () => {
	const children = [
		{ types: [], props: { children: "H" } },
		{ types: [], props: { children: "e" } },
		{ types: [], props: { children: "l" } },
		{ types: [], props: { children: "l" } },
		{ types: [], props: { children: "o" } },
		{ types: [], props: { children: "," } },
		{ types: [], props: { children: " " } },
		{ types: [], props: { children: "w" } },
		{ types: [], props: { children: "o" } },
		{ types: [], props: { children: "r" } },
		{ types: [], props: { children: "l" } },
		{ types: [], props: { children: "d" } },
		{ types: [], props: { children: "!" } },
	]
	concat(children)
	expect(children).toEqual([
		{ types: [], props: { children: "Hello, world!" } },
	])
})

test("[Hello, ][<code>world</code>][!]", () => {
	const children = [
		{ types: [], props: { children: "Hello, " } },
		{ types: [{ type: "code", props: null }], props: { children: "world" } },
		{ types: [], props: { children: "!" } },
	]
	concat(children)
	expect(children).toEqual([
		{ types: [], props: { children: "Hello, " } },
		{ types: [{ type: "code", props: null }], props: { children: "world" } },
		{ types: [], props: { children: "!" } },
	])
})

test("Hello, <a href='foo'>foo</a><a href='foo'>foo</a>!", () => {
	const children = [
		{ value: [], props: { children: "Hello, " } },
		{ types: [{ type: "a", props: { href: "foo" } }], props: { children: "foo" } },
		{ types: [{ type: "a", props: { href: "foo" } }], props: { children: "foo" } },
		{ value: [], props: { children: "!" } },
	]
	concat(children)
	expect(children).toEqual([
		{ value: [], props: { children: "Hello, " } },
		{ types: [{ type: "a", props: { href: "foo" } }], props: { children: "foofoo" } },
		{ value: [], props: { children: "!" } },
	])
})

test("Hello, <a href='foo'>foo</a><a href='bar'>bar</a>!", () => {
	const children = [
		{ value: [], props: { children: "Hello, " } },
		{ types: [{ type: "a", props: { href: "foo" } }], props: { children: "foo" } },
		{ types: [{ type: "a", props: { href: "bar" } }], props: { children: "bar" } },
		{ value: [], props: { children: "!" } },
	]
	concat(children)
	expect(children).toEqual([
		{ value: [], props: { children: "Hello, " } },
		{ types: [{ type: "a", props: { href: "foo" } }], props: { children: "foo" } },
		{ types: [{ type: "a", props: { href: "bar" } }], props: { children: "bar" } },
		{ value: [], props: { children: "!" } },
	])
})
