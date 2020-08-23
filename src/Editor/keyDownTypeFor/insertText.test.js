import * as insertText from "./insertText"
import keyCodeFor from "lib/Client/keyCodeFor"

test("insertText(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		key: "a",
	}
	expect(insertText.insertText(e)).toBeTruthy()
	expect(insertText.insertText({ ...e, shiftKey: true, key: "A" })).toBeTruthy()
	expect(insertText.insertText({ ...e, ctrlKey: true })).not.toBeTruthy()
	expect(insertText.insertText({ ...e, altKey: true, key: "¯" })).toBeTruthy()
	expect(insertText.insertText({ ...e, metaKey: true })).not.toBeTruthy()
	expect(insertText.insertText({ ...e, key: "foo" })).not.toBeTruthy()
})

test("insertComposedTextUnidentified(...)", () => {
	const e = {
		keyCode: 229,
		key: "Dead",
	}
	expect(insertText.insertComposedTextUnidentified(e)).toBeTruthy()
	expect(insertText.insertComposedTextIdentified(e)).not.toBeTruthy()
})

test("insertComposedTextIdentified(...)", () => {
	const e = {
		keyCode: 229,
		key: "ㅇ", // kr/"d"
	}
	expect(insertText.insertComposedTextIdentified(e)).toBeTruthy()
	expect(insertText.insertComposedTextUnidentified(e)).not.toBeTruthy()
})

test("insertTab(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Tab"),
	}
	expect(insertText.insertTab(e)).toBeTruthy()
	expect(insertText.insertTab({ ...e, shiftKey: true })).toBeTruthy()
})

test("insertSoftParagraph(...)", () => {
	expect(insertText.insertSoftParagraph({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
})

test("insertHardParagraph(...)", () => {
	expect(insertText.insertHardParagraph({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
})

test("insertHorizontalRule(...)", () => {
	expect(insertText.insertHorizontalRule({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
})
