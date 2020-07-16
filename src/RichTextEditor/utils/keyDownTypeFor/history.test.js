import history from "./history"
import keyCodeFor from "lib/Client/keyCodeFor"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

test("undo(...); non-macOS", () => {
	mockNonMacOS()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})

test("undo(...); macOS", () => {
	mockMacOS()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
})

test("redo(...); non-macOS", () => {
	mockNonMacOS()
	expect(history.redo({
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Y"),
	})).not.toBeTruthy()
	expect(history.redo({
		shiftKey: false,
		ctrlKey: true,
		metaKey: false,
		keyCode: keyCodeFor("Y"),
	})).toBeTruthy()
})

// // FIXME: Should be working; broken most likely due to eager isCtrlOrMetaKey evaluation
// test("redo(...); macOS", () => {
// 	mockMacOS()
// 	expect(history.redo({
// 		shiftKey: false,
// 		ctrlKey: false,
// 		metaKey: false,
// 		keyCode: keyCodeFor("Z"),
// 	})).not.toBeTruthy()
// 	expect(history.redo({
// 		shiftKey: true,
// 		ctrlKey: false,
// 		metaKey: true,
// 		keyCode: keyCodeFor("Z"),
// 	})).toBeTruthy()
// })
