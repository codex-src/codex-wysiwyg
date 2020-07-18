// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

// Tests the user agent.
const userAgent = process.env.NODE_ENV === "test"
	? Object.freeze({
		get MacOSX() {
			return testUserAgent("Mac OS X")
		},
	}) : Object.freeze({
		MacOSX: testUserAgent("Mac OS X"),
	})

export default userAgent
