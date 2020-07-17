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
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})

test("rune(...); macOS", () => {
	mockMacOS()
	expect(deleteLTR.rune({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("D"),
	})).toBeTruthy()
})

/*
 * word
 */

test("word(...); non-macOS", () => {
	mockNonMacOS()
	expect(deleteLTR.word({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})

test("word(...); macOS", () => {
	mockMacOS()
	expect(deleteLTR.word({
		shiftKey: false,
		ctrlKey: false,
		altKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	})).toBeTruthy()
})
