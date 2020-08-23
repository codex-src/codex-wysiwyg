import * as deleteRTL from "./deleteRTL"
import keyCodeFor from "lib/Client/keyCodeFor"

import {
	mockMacOS,
	mockNonMacOS,
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
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.runeAny(e)).toBeTruthy()
	expect(deleteRTL.runeAny({ ...e, shiftKey: true })).toBeTruthy()
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
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.wordNonMacOS(e)).toBeTruthy()
	expect(deleteRTL.wordNonMacOS({ ...e, shiftKey: true })).toBeTruthy()
})

test("wordMacOS(...)", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.wordMacOS(e)).toBeTruthy()
	expect(deleteRTL.wordMacOS({ ...e, ctrlKey: true })).toBeTruthy()
	expect(deleteRTL.wordMacOS({ ...e, shiftKey: true })).toBeTruthy()
})

/*
 * line
 */

test("lineMacOS(...)", () => {
	mockMacOS()
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Backspace"),
	}
	expect(deleteRTL.lineMacOS(e)).toBeTruthy()
	expect(deleteRTL.lineMacOS({ ...e, shiftKey: true })).toBeTruthy()
})
