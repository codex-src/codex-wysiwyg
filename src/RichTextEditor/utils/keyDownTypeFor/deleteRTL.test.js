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
	expect(deleteRTL.rune({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})

/*
 * word
 */

test("word(...); non-macOS", () => {
	mockNonMacOS()
	expect(deleteRTL.word({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})

test("word(...); macOS", () => {
	mockMacOS()
	expect(deleteRTL.word({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 1,
		metaKey: 0,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})

/*
 * line
 */

test("line(...); macOS", () => {
	mockMacOS()
	expect(deleteRTL.line({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})
