// NOTE: import userAgent from "..." breaks the test runner.

// https://stackoverflow.com/a/25518045
test("isAAPL=false", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	const userAgent = { isAAPL }
	expect(userAgent.isAAPL).not.toBeTruthy()
})

test("isAAPL=true", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
	const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	const userAgent = { isAAPL }
	expect(userAgent.isAAPL).toBeTruthy()
})

test("isGOOG=false", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	const isGOOG = navigator.userAgent.indexOf("Android") >= 0
	const userAgent = { isGOOG }
	expect(userAgent.isGOOG).not.toBeTruthy()
})

test("isGOOG=true", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Android ...",
		configurable: true,
	})
	const isGOOG = navigator.userAgent.indexOf("Android") >= 0
	const userAgent = { isGOOG }
	expect(userAgent.isGOOG).toBeTruthy()
})
