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
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})

/*
 * word
 */
test("word(...); non-macOS", () => {
	mockNonMacOS()
	expect(deleteRTL.word({
		shiftKey: false,
		ctrlKey: true,
		altKey: false, // TODO
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})
test("word(...); macOS", () => {
	mockMacOS()
	expect(deleteRTL.word({
		shiftKey: false,
		ctrlKey: false,
		altKey: true, // TODO
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})

/*
 * line
 */
test("line(...)", () => {
	expect(deleteRTL.line({
		shiftKey: false,
		ctrlKey: false,
		altKey: false, // TODO
		metaKey: true,
		keyCode: keyCodeFor("Backspace"),
	})).toBeTruthy()
})
