// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUA(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

const userAgent = {
	// https://apple.com
	AAPL: testUA("Mac OS X"),

	// https://google.com
	GOOG: testUA("Android"),
}

export default userAgent
