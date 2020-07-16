import applyFormatMarkdown from "./applyFormatMarkdown"
import keyCodeFor from "lib/Client/keyCodeFor"

test("em(...)", () => {
	expect(applyFormatMarkdown.em({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("_"),
	})).toBeTruthy()
})

test("strong(...)", () => {
	expect(applyFormatMarkdown.strong({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("*"),
	})).toBeTruthy()
})

test("code(...)", () => {
	expect(applyFormatMarkdown.code({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("`"),
	})).toBeTruthy()
})

test("strike(...)", () => {
	expect(applyFormatMarkdown.strike({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("~"),
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormatMarkdown.a({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("["),
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormatMarkdown.a({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("]"),
	})).toBeTruthy()
})
