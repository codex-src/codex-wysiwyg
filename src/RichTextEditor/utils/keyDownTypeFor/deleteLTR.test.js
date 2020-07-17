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
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.rune(e)).toBeTruthy()
	expect(deleteLTR.rune({ ...e, shiftKey: true })).toBeTruthy()
})

test("rune(...); macOS", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("D"),
	}
	expect(deleteLTR.rune(e)).toBeTruthy()
	// expect(deleteLTR.rune({ ...e, shiftKey: true })).toBeTruthy()
})

/*
 * word
 */

test("word(...); non-macOS", () => {
	mockNonMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.word(e)).toBeTruthy()
	expect(deleteLTR.word({ ...e, shiftKey: true })).toBeTruthy()
})

test("word(...); macOS", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.word(e)).toBeTruthy()
	expect(deleteLTR.word({ ...e, shiftKey: true })).toBeTruthy()
})
