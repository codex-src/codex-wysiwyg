import userAgent from "lib/Client/userAgent"

// Returns whether a key down event exclusively uses the
// control key or meta (command on macOS) key.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function isCtrlOrMetaKey(e) {
	let AAPL = userAgent.AAPL
	if (process.env.NODE_ENV === "test") {
		AAPL = navigator.userAgent.indexOf("Mac OS X") >= 0
	}
	if (!AAPL) {
		const ok = (
			e.ctrlKey &&
			!e.metaKey
		)
		return ok
	} else {
		const ok = (
			!e.ctrlKey &&
			e.metaKey
		)
		return ok
	}
	// eslint-disable-next-line no-unreachable
	return false
}

export default isCtrlOrMetaKey
