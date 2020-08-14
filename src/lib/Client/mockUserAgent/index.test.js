import {
	mockMacOS,
	mockNonMacOS,
} from "./index"

// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

test("non-macOS", () => {
	mockNonMacOS()
	expect(testUserAgent("Mac OS X")).not.toBeTruthy()
})

test("macOS", () => {
	mockMacOS()
	expect(testUserAgent("Mac OS X")).toBeTruthy()
})
