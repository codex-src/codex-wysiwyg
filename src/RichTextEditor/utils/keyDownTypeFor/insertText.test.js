import insertText from "./insertText"
import keyCodeFor from "lib/Client/keyCodeFor"

test("insertText(...)", () => {
	expect(insertText.insertText({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		key: "a",
	})).toBeTruthy()
	expect(insertText.insertText({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		key: "A",
	})).toBeTruthy()
	expect(insertText.insertText({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		key: "foo",
	})).not.toBeTruthy()
	expect(insertText.insertText({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		key: "FOO",
	})).not.toBeTruthy()
	expect(insertText.insertText({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		key: "a",
	})).not.toBeTruthy()
	expect(insertText.insertText({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		key: "a",
	})).not.toBeTruthy()
})

test("insertTab(...)", () => {
	expect(insertText.insertTab({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Tab"),
	})).toBeTruthy()
	expect(insertText.insertTab({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Tab"),
	})).toBeTruthy()
	expect(insertText.insertTab({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Tab"),
	})).not.toBeTruthy()
	expect(insertText.insertTab({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Tab"),
	})).not.toBeTruthy()
})

test("insertSoftParagraph(...)", () => {
	expect(insertText.insertSoftParagraph({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).not.toBeTruthy()
	expect(insertText.insertSoftParagraph({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
	expect(insertText.insertSoftParagraph({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).not.toBeTruthy()
	expect(insertText.insertSoftParagraph({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Enter"),
	})).not.toBeTruthy()
})

test("insertHardParagraph(...)", () => {
	expect(insertText.insertHardParagraph({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
	expect(insertText.insertHardParagraph({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).not.toBeTruthy()
	expect(insertText.insertHardParagraph({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
	expect(insertText.insertHardParagraph({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
})
