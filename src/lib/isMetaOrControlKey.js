// macOS implementation of isMetaOrControlKey.
function isMetaOrControlKeyMacOS(e) {
	const ok = (
		!e.ctrlKey &&
		e.metaKey
	)
	return ok
}

// Returns whether an key down event exclusively uses the
// meta (command on macOS) or control key.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function isMetaOrControlKey(e) {
	if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
		return isMetaOrControlKeyMacOS(e)
	}
	const ok = (
		e.ctrlKey &&
		!e.metaKey
	)
	return ok
}

export default isMetaOrControlKey
