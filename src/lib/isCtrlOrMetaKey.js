// macOS implementation of isCtrlOrMetaKey.
function isCtrlOrMetaKeyMacOS(e) {
	const ok = (
		!e.ctrlKey &&
		e.metaKey
	)
	return ok
}

// Returns whether an key down event exclusively uses the
// control key or meta (command on macOS) key.
//
// https://css-tricks.com/snippets/javascript/test-mac-pc-javascript
function isCtrlOrMetaKey(e) {
	if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
		return isCtrlOrMetaKeyMacOS(e)
	}
	const ok = (
		e.ctrlKey &&
		!e.metaKey
	)
	return ok
}

export default isCtrlOrMetaKey
