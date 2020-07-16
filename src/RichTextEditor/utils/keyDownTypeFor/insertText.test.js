import insertText from "./insertText"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

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
	const e = {
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	}
	expect(insertText.insertSoftParagraph(e)).toBeTruthy()
})

test("insertHardParagraph(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	}
	expect(insertText.insertHardParagraph(e)).toBeTruthy()
})

test("insertHorizontalRule(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	}
	expect(insertText.insertHorizontalRule(e)).toBeTruthy()
})
