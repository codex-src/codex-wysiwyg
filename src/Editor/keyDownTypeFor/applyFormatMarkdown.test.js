import * as applyFormatMarkdown from "./applyFormatMarkdown"

test("em(...)", () => {
	expect(applyFormatMarkdown.em({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "_",
	})).toBeTruthy()
})

test("strong(...)", () => {
	expect(applyFormatMarkdown.strong({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "*",
	})).toBeTruthy()
})

test("code(...)", () => {
	expect(applyFormatMarkdown.code({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "`",
	})).toBeTruthy()
})

test("strike(...)", () => {
	expect(applyFormatMarkdown.strike({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "~",
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormatMarkdown.a({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "[",
	})).toBeTruthy()
	expect(applyFormatMarkdown.a({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "]",
	})).toBeTruthy()
})
