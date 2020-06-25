// Throws on:
//
// - undefined
// - false
// - -1
// - ""
// - null
//
function must(value) {
	if (value === undefined || value === false || value === -1 || value === "" || value === null) {
		// eslint-disable-next-line quotes
		throw new Error(`must: value=${value || `""`} must not be undefined, false, -1, "", or null`)
	}
	return value
}

export default must
