// Throws on undefined, false, -1, and null.
function check(value) {
	if (value === undefined || value === false || value === -1 || value === null) {
		throw new Error(`check: value=${value} cannot be undefined, null, or -1`)
	}
	return value
}

export default check
