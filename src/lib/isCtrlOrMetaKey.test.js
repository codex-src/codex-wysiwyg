import isCtrlOrMetaKey from "./isCtrlOrMetaKey"

test("non macOS", () => {
	// https://github.com/facebook/jest/issues/717#issuecomment-187017936
	// https://stackoverflow.com/a/25518045
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).toBe(false)
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).toBe(true)
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).toBe(false)
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).toBe(false)
	/* eslint-enable no-multi-spaces */
})

test("macOS", () => {
	// https://github.com/facebook/jest/issues/717#issuecomment-187017936
	// https://stackoverflow.com/a/25518045
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
	/* eslint-disable no-multi-spaces */
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: false })).toBe(false)
	expect(isCtrlOrMetaKey({ metaKey: false, ctrlKey: true  })).toBe(false)
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: false })).toBe(true)
	expect(isCtrlOrMetaKey({ metaKey: true,  ctrlKey: true  })).toBe(false)
	/* eslint-enable no-multi-spaces */
})
