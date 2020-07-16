// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

// TODO: Refactor to isAppleDevice?
// TODO: Refactor to isAndroidDevice?
const userAgent = process.env.NODE_ENV === "test"
	? Object.freeze({
		// https://apple.com
		get isAAPL() {
			return testUserAgent("Mac OS X")
		},
		// https://android.com
		get isGOOG() {
			return testUserAgent("Android")
		},
	}) : Object.freeze({
		// https://apple.com
		isAAPL: testUserAgent("Mac OS X"),
		// https://android.com
		isGOOG: testUserAgent("Android"),
	})

export default userAgent
