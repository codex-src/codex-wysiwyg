// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

// https://apple.com
const isAAPL = testUserAgent("Mac OS X")

// https://android.com
const isGOOG = testUserAgent("Android")

const userAgent = {
	isAAPL,
	isGOOG,
}

export default userAgent
