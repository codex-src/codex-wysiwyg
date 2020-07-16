// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

// Tests the user agent.
//
// TODO: Rename to userAgent.isApple?
const userAgent = process.env.NODE_ENV === "test"
	? Object.freeze({
		get isAAPL() {
			return testUserAgent("Mac OS X")
		},
	}) : Object.freeze({
		isAAPL: testUserAgent("Mac OS X"),
	})

export default userAgent
