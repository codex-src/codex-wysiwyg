import isCtrlOrMetaKey from "./index"

// https://github.com/facebook/jest/issues/717#issuecomment-369872760

test("non-macOS", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).not.toBeTruthy()
	/* eslint-enable no-multi-spaces */
})

test("macOS", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).not.toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).toBeTruthy()
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).not.toBeTruthy()
	/* eslint-enable no-multi-spaces */
})
