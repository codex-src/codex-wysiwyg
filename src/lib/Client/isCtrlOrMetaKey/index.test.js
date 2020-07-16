import isCtrlOrMetaKey from "./index"

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

test("non-macOS", () => {
	mockNonMacOS()
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).not.toBeTruthy()
	/* eslint-enable no-multi-spaces */
})

test("macOS", () => {
	mockMacOS()
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).not.toBeTruthy()
	/* eslint-enable no-multi-spaces */
})
