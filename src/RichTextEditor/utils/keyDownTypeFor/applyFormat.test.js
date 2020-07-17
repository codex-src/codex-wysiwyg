import applyFormat from "./applyFormat"
import keyCodeFor from "lib/Client/keyCodeFor"

test("em(...)", () => {
	expect(applyFormat.em({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("I"),
	})).toBeTruthy()
})

test("strong(...)", () => {
	expect(applyFormat.strong({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("B"),
	})).toBeTruthy()
})

test("code(...)", () => {
	expect(applyFormat.code({
		shiftKey: true,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("C"),
	})).toBeTruthy()
})

test("strike(...)", () => {
	expect(applyFormat.strike({
		shiftKey: true,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("X"),
	})).toBeTruthy()
})

test("a(...)", () => {
	expect(applyFormat.a({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("K"),
	})).toBeTruthy()
})
