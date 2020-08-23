import parseInlineElements from "./parseInlineElements"

test("plaintext", () => {
	expect(parseInlineElements("")).toEqual(null)
	expect(parseInlineElements("Hello, world!")).toEqual(["Hello, world!"])
})

test("_em_", () => {
	expect(parseInlineElements("Hello, _world_!")).toEqual([
		"Hello, ",
		{
			type: "em",
			props: {
				syntax: "_",
				children: "world",
			},
		},
		"!",
	])
})

test("__strong__", () => {
	expect(parseInlineElements("Hello, __world__!")).toEqual([
		"Hello, ",
		{
			type: "strong",
			props: {
				syntax: "__",
				children: "world",
			},
		},
		"!",
	])
})

test("___strong em___", () => {
	expect(parseInlineElements("Hello, ___world___!")).toEqual([
		"Hello, ",
		{
			type: "strong em",
			props: {
				syntax: "___",
				children: "world",
			},
		},
		"!",
	])
})

test("*em*", () => {
	expect(parseInlineElements("Hello, *world*!")).toEqual([
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

test("**strong**", () => {
	expect(parseInlineElements("Hello, **world**!")).toEqual([
		"Hello, ",
		{
			type: "strong",
			props: {
				syntax: "**",
				children: "world",
			},
		},
		"!",
	])
})

test("***strong em***", () => {
	expect(parseInlineElements("Hello, ***world***!")).toEqual([
		"Hello, ",
		{
			type: "strong em",
			props: {
				syntax: "***",
				children: "world",
			},
		},
		"!",
	])
})

test("`code`", () => {
	expect(parseInlineElements("Hello, `world`!")).toEqual([
		"Hello, ",
		{
			type: "code",
			props: {
				syntax: "`",
				children: "world",
			},
		},
		"!",
	])
})

test("~code~", () => {
	expect(parseInlineElements("Hello, ~world~!")).toEqual([
		"Hello, ",
		{
			type: "code",
			props: {
				syntax: "~",
				children: "world",
			},
		},
		"!",
	])
})

test("~~strike~~", () => {
	expect(parseInlineElements("Hello, ~~world~~!")).toEqual([
		"Hello, ",
		{
			type: "strike",
			props: {
				syntax: "~~",
				children: "world",
			},
		},
		"!",
	])
})

// test("https://google.com", () => {
// 	console.log(parseInlineElements("Hello, https://google.com!"))
// 	expect(parseInlineElements("Hello, https://google.com!")).toEqual([
// 		"Hello, ",
// 		{
// 			type: "a",
// 			props: {
// 				syntax: ["https://"],
// 				children: "google.com",
// 			},
// 		},
// 		"!",
// 	])
// })

test("[a](href)", () => {
	expect(parseInlineElements("Hello, [world](https://google.com)!")).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["[", "](https://google.com)"],
				href: "https://google.com",
				children: "world",
			},
		},
		"!",
	])
})
