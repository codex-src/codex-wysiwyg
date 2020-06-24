// Throws on undefined, null, or -1.
function check(value) {
	if (value === undefined || value === null || value === -1) {
		throw new Error(`check: value=${value} cannot be undefined, null, or -1`)
	}
	return value
}

export default check
