import deleteRTL from "./deleteRTL"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

/*
 * rune
 */

test("rune(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.rune(e)).toBeTruthy()
	expect(deleteRTL.rune({ ...e, shiftKey: true })).toBeTruthy()
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
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.word(e)).toBeTruthy()
	expect(deleteRTL.word({ ...e, shiftKey: true })).toBeTruthy()
})

test("word(...); macOS", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.word(e)).toBeTruthy()
	expect(deleteRTL.word({ ...e, ctrlKey: true })).toBeTruthy()
	expect(deleteRTL.word({ ...e, shiftKey: true })).toBeTruthy()
})

/*
 * line
 */

test("line(...); macOS", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.line(e)).toBeTruthy()
	expect(deleteRTL.line({ ...e, shiftKey: true })).toBeTruthy()
})
