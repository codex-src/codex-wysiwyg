// Throws on:
//
// - undefined
// - false
// - -1
// - ""
// - null
//
function check(value) {
	if (value === undefined || value === false || value === -1 || value === "" || value === null) {
		throw new Error(`check: value=${value} must be a non-0 zero value`)
	}
	return value
}

export default check
