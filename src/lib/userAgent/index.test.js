// NOTE: Does not use lib/userAgent because of tests.

// https://stackoverflow.com/a/25518045
describe("AAPL", () => {
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "...",
			configurable: true,
		})
		const AAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
		expect(AAPL).not.toBeTruthy()
	})
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "... Mac OS X ...",
			configurable: true,
		})
		const AAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
		expect(AAPL).toBeTruthy()
	})
})

describe("GOOGE", () => {
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "...",
			configurable: true,
		})
		const GOOG = navigator.userAgent.indexOf("Android") >= 0
		expect(GOOG).not.toBeTruthy()
	})
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "... Android ...",
			configurable: true,
		})
		const GOOG = navigator.userAgent.indexOf("Android") >= 0
		expect(GOOG).toBeTruthy()
	})
})
