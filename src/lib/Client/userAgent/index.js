// Tests the user agent for a substring.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function testUserAgent(substr) {
	return navigator.userAgent.indexOf(substr) >= 0
}

const userAgent = {
	// https://apple.com
	isAAPL: testUserAgent("Mac OS X"),
	// https://android.com
	isGOOG: testUserAgent("Android"),
}

export default userAgent

// const userAgent = {
// 	// Tests the user agent for a substring.
// 	//
// 	// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
// 	test(substr) {
// 		return navigator.userAgent.indexOf(substr) >= 0
// 	},
// 	// https://apple.com
// 	isAAPL: this.test("Mac OS X"),
// 	// https://android.com
// 	isGOOG: this.test("Android"),
// }
//
// export default userAgent
