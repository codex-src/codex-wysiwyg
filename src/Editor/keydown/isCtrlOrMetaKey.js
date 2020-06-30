// Returns whether an key down event exclusively uses the
// control key or meta (command on macOS) key.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function isCtrlOrMetaKey(e) {
	// NOTE: Uses navigator.userAgent for
	// isCtrlOrMetaKey.test.js.
	if (navigator.userAgent.indexOf("Mac OS X") === -1) {
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
