import deleteLTR from "./deleteLTR"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

/*
 * rune
 */
test("rune(...); non-macOS and macOS", () => {
	expect(deleteLTR.rune({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})
test("rune(...); macOS", () => {
	mockMacOS()
	expect(deleteLTR.rune({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("D"),
	})).toBeTruthy()
})

/*
 * word
 */
test("word(...); non-macOS", () => {
	mockNonMacOS()
	expect(deleteLTR.word({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})
test("word(...); macOS", () => {
	mockMacOS()
	expect(deleteLTR.word({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 1,
		metaKey: 0,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})
