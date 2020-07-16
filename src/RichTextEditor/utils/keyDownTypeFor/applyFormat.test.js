import applyFormat from "./applyFormat"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

/*
 * em
 */
test("em(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.em({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("I"),
	})).toBeTruthy()
})
test("em(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.em({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("I"),
	})).toBeTruthy()
})

/*
 * strong
 */
test("strong(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.strong({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("B"),
	})).toBeTruthy()
})
test("strong(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.strong({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("B"),
	})).toBeTruthy()
})

/*
 * code
 */
test("code(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.code({
		shiftKey: 1,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("C"),
	})).toBeTruthy()
})
test("code(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.code({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("C"),
	})).toBeTruthy()
})

/*
 * strike
 */
test("strike(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.strike({
		shiftKey: 1,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("X"),
	})).toBeTruthy()
})
test("strike(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.strike({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("X"),
	})).toBeTruthy()
})

/*
 * a
 */
test("a(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.a({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("K"),
	})).toBeTruthy()
})
test("a(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.a({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("K"),
	})).toBeTruthy()
})
