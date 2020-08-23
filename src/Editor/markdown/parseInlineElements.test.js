import parseInlineElements from "./parseInlineElements"

test("plaintext", () => {
	expect(parseInlineElements("")).toEqual(null)
	expect(parseInlineElements("Hello, world!")).toEqual(["Hello, world!"])
})

test("_em_", () => {
	const parsed = parseInlineElements("Hello, _world_!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, __world__!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, ___world___!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, *world*!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, **world**!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, ***world***!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, `world`!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, ~world~!")
	expect(parsed).toEqual([
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
	const parsed = parseInlineElements("Hello, ~~world~~!")
	expect(parsed).toEqual([
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

test("https://", () => {
	const parsed = parseInlineElements("Hello, https://!")
	expect(parsed).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["https://", ""],
				children: "",
			},
		},
		"!",
	])
})

test("https://google.com", () => {
	const parsed = parseInlineElements("Hello, https://google.com!")
	expect(parsed).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["https://", ""],
				children: "google.com",
			},
		},
		"!",
	])
})

test("[](href)", () => {
	const parsed = parseInlineElements("Hello, [](href)!")
	expect(parsed).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["[", "](href)"],
				href: "href",
				children: "",
			},
		},
		"!",
	])
})

test("[a]()", () => {
	const parsed = parseInlineElements("Hello, [a]()!")
	expect(parsed).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["[", "]()"],
				href: "",
				children: "a",
			},
		},
		"!",
	])
})

test("[a](href)", () => {
	const parsed = parseInlineElements("Hello, [world](href)!")
	expect(parsed).toEqual([
		"Hello, ",
		{
			type: "a",
			props: {
				syntax: ["[", "](href)"],
				href: "href",
				children: "world",
			},
		},
		"!",
	])
})

test("_test_test_", () => {
	const parsed = parseInlineElements("_test_test_")
	expect(parsed).toEqual([
		{
			type: "em",
			props: {
				syntax: "_",
				children: "test_test",
			},
		},
	])
})

test("__test__test__", () => {
	const parsed = parseInlineElements("__test__test__")
	expect(parsed).toEqual([
		{
			type: "strong",
			props: {
				syntax: "__",
				children: "test__test",
			},
		},
	])
})

test("___test___test___", () => {
	const parsed = parseInlineElements("___test___test___")
	console.log(parsed)
	expect(parsed).toEqual([
		{
			type: "strong em",
			props: {
				syntax: "___",
				children: "test___test",
			},
		},
	])
})

// // test("[a](href)[a](href)", () => {
// 	const parsed = parseInlineElements("[a](href)[a](href)")).toEqual(["[a](href
// // parsed	expect()[a](href)"])
// // })
