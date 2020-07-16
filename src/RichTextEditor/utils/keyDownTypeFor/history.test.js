import history from "./history"
import keyCodeFor from "lib/Client/keyCodeFor"

// Mocks a non-macOS user agent.
function mockNonMacOS() {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
}

// Mocks a macOS user agent.
function mockMacOS() {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
}

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
