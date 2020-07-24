import textContent from "./index"

const children = [
	{ types: [], props: { children: "Hello, " } },
	{ types: [{ type: "code", props: null }], props: { children: "world" } },
	{ types: [], props: { children: "!" } },
]

test("textContent(...)", () => {
	expect(textContent(children.slice(0, 0))).toBe("")
	expect(textContent(children.slice(0, 1))).toBe("Hello, ")
	expect(textContent(children.slice(0, 2))).toBe("Hello, world")
	expect(textContent(children.slice(0, 3))).toBe("Hello, world!")
})
