import * as deleteLTR from "./deleteLTR"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

/*
 * rune
 */

test("runeAny(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.runeAny(e)).toBeTruthy()
	expect(deleteLTR.runeAny({ ...e, shiftKey: true })).toBeTruthy()
})

test("runeMacOS(...)", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("D"),
	}
	expect(deleteLTR.runeMacOS(e)).toBeTruthy()
	// expect(deleteLTR.rune({ ...e, shiftKey: true })).toBeTruthy()
})

/*
 * word
 */

test("wordNonMacOS(...)", () => {
	mockNonMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.wordNonMacOS(e)).toBeTruthy()
	expect(deleteLTR.wordNonMacOS({ ...e, shiftKey: true })).toBeTruthy()
})

test("wordMacOS(...)", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Delete"),
	}
	expect(deleteLTR.wordMacOS(e)).toBeTruthy()
	expect(deleteLTR.wordMacOS({ ...e, shiftKey: true })).toBeTruthy()
})
