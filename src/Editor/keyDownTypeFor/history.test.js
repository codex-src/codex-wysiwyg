import * as history from "./history"
import keyCodeFor from "lib/Client/keyCodeFor"

import {
	mockMacOS,
	mockNonMacOS,
} from "lib/Client/mockUserAgent"

/*
 * undo
 */

test("undo(...); non-macOS", () => {
	mockNonMacOS()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})

test("undo(...); macOS", () => {
	mockMacOS()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})

/*
 * redo
 */

test("redoNonMacOS(...)", () => {
	mockNonMacOS()
	expect(history.redoNonMacOS({
		shiftKey: false,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Y"),
	})).toBeTruthy()
})

test("redoMacOS(...)", () => {
	mockMacOS()
	expect(history.redoMacOS({
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})
