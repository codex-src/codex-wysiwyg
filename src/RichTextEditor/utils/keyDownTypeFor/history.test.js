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
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
	expect(history.undo({
		shiftKey: true,
		ctrlKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
})

test("undo(...); macOS", () => {
	mockMacOS()
	expect(history.undo({
		shiftKey: false,
		ctrlKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).toBeTruthy()
	expect(history.undo({
		shiftKey: true,
		ctrlKey: false,
		metaKey: true,
		keyCode: keyCodeFor("Z"),
	})).not.toBeTruthy()
})
