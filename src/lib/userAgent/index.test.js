// NOTE: Does not use userAgent.* because of test runner.

// https://stackoverflow.com/a/25518045
describe("isAAPL", () => {
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "...",
			configurable: true,
		})
		const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
		expect(isAAPL).not.toBeTruthy()
	})
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "... Mac OS X ...",
			configurable: true,
		})
		const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
		expect(isAAPL).toBeTruthy()
	})
})

describe("isGOOG", () => {
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "...",
			configurable: true,
		})
		const isGOOG = navigator.userAgent.indexOf("Android") >= 0
		expect(isGOOG).not.toBeTruthy()
	})
	test("", () => {
		Object.defineProperty(window.navigator, "userAgent", {
			value: "... Android ...",
			configurable: true,
		})
		const isGOOG = navigator.userAgent.indexOf("Android") >= 0
		expect(isGOOG).toBeTruthy()
	})
})
