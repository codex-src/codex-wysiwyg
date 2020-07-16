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
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("I"),
	})).toBeTruthy()
})
test("em(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.em({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("I"),
	})).toBeTruthy()
})

/*
 * strong
 */
test("strong(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.strong({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("B"),
	})).toBeTruthy()
})
test("strong(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.strong({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("B"),
	})).toBeTruthy()
})

/*
 * code
 */
test("code(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.code({
		shiftKey: true,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("C"),
	})).toBeTruthy()
})
test("code(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.code({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("C"),
	})).toBeTruthy()
})

/*
 * strike
 */
test("strike(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.strike({
		shiftKey: true,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("X"),
	})).toBeTruthy()
})
test("strike(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.strike({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("X"),
	})).toBeTruthy()
})

/*
 * a
 */
test("a(...); non-macOS", () => {
	mockNonMacOS()
	expect(applyFormat.a({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("K"),
	})).toBeTruthy()
})
test("a(...); macOS", () => {
	mockMacOS()
	expect(applyFormat.a({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("K"),
	})).toBeTruthy()
})
