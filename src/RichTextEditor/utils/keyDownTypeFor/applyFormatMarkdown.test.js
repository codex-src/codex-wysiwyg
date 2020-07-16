import applyFormatMarkdown from "./applyFormatMarkdown"
import keyCodeFor from "lib/Client/keyCodeFor"

test("em(...)", () => {
	expect(applyFormatMarkdown.em({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("_"),
	})).toBeTruthy()
})

test("strong(...)", () => {
	expect(applyFormatMarkdown.strong({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("*"),
	})).toBeTruthy()
})

test("code(...)", () => {
	expect(applyFormatMarkdown.code({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("`"),
	})).toBeTruthy()
})

test("strike(...)", () => {
	expect(applyFormatMarkdown.strike({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("~"),
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormatMarkdown.a({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("["),
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormatMarkdown.a({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("]"),
	})).toBeTruthy()
})
