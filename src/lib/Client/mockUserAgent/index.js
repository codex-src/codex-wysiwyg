// Mocks a non-macOS user agent.
export function mockNonMacOS() {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "...",
		configurable: true,
	})
}

// Mocks a macOS user agent.
export function mockMacOS() {
	Object.defineProperty(window.navigator, "userAgent", {
		value: "... Mac OS X ...",
		configurable: true,
	})
}
