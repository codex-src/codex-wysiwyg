import history from "./history"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

/*
 * undo
 */
test("undo(...); non-macOS", () => {
	mockNonMacOS()
	expect(history.undo({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.undo({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})
test("undo(...); macOS", () => {
	mockMacOS()
	expect(history.undo({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.undo({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})

/*
 * redo
 */
test("redo(...); non-macOS", () => {
	mockNonMacOS()
	expect(history.redo({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Y"),
	})).not.toBeTruthy()
	expect(history.redo({
		shiftKey: 0,
		ctrlKey: 1,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Y"),
	})).toBeTruthy()
})
test("redo(...); macOS", () => {
	mockMacOS()
	expect(history.redo({
		shiftKey: 0,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 0,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.redo({
		shiftKey: 1,
		ctrlKey: 0,
		altKey: 0,
		metaKey: 1,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})
