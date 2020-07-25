import hash from "lib/x/hash"
import innerText from "./index"

test("(empty)", () => {
	const els = [
		{
			type: "p",
			key: hash(),
			props: {
				children: [],
			},
		},
	]
	expect(innerText(els)).toBe("")
})

test("Hello, world!", () => {
	const els = [
		{
			type: "p",
			key: hash(),
			props: {
				children: [
					{
						types: {},
						props: {
							children: "Hello, world!",
						},
					},
				],
			},
		},
	]
	expect(innerText(els)).toBe("Hello, world!")
})

test("Hello, world!\\n\\nHello darkness, my old friend…", () => {
	const els = [
		{
			type: "p",
			key: hash(),
			props: {
				children: [
					{
						types: {},
						props: {
							children: "Hello, world!",
						},
					},
				],
			},
		},
		{
			type: "p",
			key: hash(),
			props: {
				children: [],
			},
		},
		{
			type: "p",
			key: hash(),
			props: {
				children: [
					{
						types: {},
						props: {
							children: "Hello darkness, my old friend…",
						},
					},
				],
			},
		},
	]
	expect(innerText(els)).toBe("Hello, world!\n\nHello darkness, my old friend…")
})
