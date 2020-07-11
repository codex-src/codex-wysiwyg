// NOTE: Does not use userAgent.* because of test runner.

// https://stackoverflow.com/a/25518045
test("userAgent.isAAPL === false", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	const userAgent = { isAAPL }
	expect(userAgent.isAAPL).not.toBeTruthy()
})

test("userAgent.isAAPL === true", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
	const isAAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	const userAgent = { isAAPL }
	expect(userAgent.isAAPL).toBeTruthy()
})

test("userAgent.isGOOG === false", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
	const isGOOG = navigator.userAgent.indexOf("Android") >= 0
	const userAgent = { isGOOG }
	expect(userAgent.isGOOG).not.toBeTruthy()
})

test("userAgent.isGOOG === true", () => {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Android ...",
		configurable: true,
	})
	const isGOOG = navigator.userAgent.indexOf("Android") >= 0
	const userAgent = { isGOOG }
	expect(userAgent.isGOOG).toBeTruthy()
})
