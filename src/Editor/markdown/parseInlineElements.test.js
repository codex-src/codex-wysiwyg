import parseInlineElements from "./parseInlineElements"

// test("plaintext", () => {
// 	expect(parseInlineElements("")).toEqual(null)
// 	expect(parseInlineElements("Hello, world!")).toEqual(["Hello, world!"])
// })

test("em", () => {
	expect(
		parseInlineElements("Hello, *world*!")
	).toEqual([
		"Hello, ",
		{
			type: "em",
			props: {
				syntax: "*",
				children: "world",
			},
		},
		"!",
	])
})

// test("strong", () => {
// 	expect(
// 		parseInlineElements("Hello, **world**!")
// 	).toEqual([
// 		"Hello, ",
// 		{
// 			type: "strong",
// 			props: {
// 				syntax: "**",
// 				children: "world",
// 			},
// 		},
// 		"!",
// 	])
// })
