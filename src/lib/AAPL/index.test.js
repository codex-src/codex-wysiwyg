test("non-macOS", () => {
	// https://github.com/facebook/jest/issues/717#issuecomment-187017936
	// https://stackoverflow.com/a/25518045
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	// NOTE: Cannot use lib/AAPL because of tests.
	const AAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	expect(AAPL).not.toBeTruthy()
})

test("macOS", () => {
	// https://github.com/facebook/jest/issues/717#issuecomment-187017936
	// https://stackoverflow.com/a/25518045
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
	// NOTE: Cannot use lib/AAPL because of tests.
	const AAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	expect(AAPL).toBeTruthy()
})
