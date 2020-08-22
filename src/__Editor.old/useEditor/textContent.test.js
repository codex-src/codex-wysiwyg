import textContent from "./textContent"

const children = [
	{ types: {}, props: { children: "Hello, " } },
	{ types: { code: {} }, props: { children: "world" } },
	{ types: {}, props: { children: "!" } },
]

test("textContent(...)", () => {
	expect(textContent([])).toBe("")
	expect(textContent(children.slice(0, 0))).toBe("")
	expect(textContent(children.slice(0, 1))).toBe("Hello, ")
	expect(textContent(children.slice(0, 2))).toBe("Hello, world")
	expect(textContent(children.slice(0, 3))).toBe("Hello, world!")
})
