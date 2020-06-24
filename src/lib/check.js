// Throws on undefined, false, -1, "", and null.
function check(value) {
	if (value === undefined || value === false || value === -1 || value === "" || value === null) {
		throw new Error(`check: value=${value} undefined, false, -1, "", and null`)
	}
	return value
}

export default check
