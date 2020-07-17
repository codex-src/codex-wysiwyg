// Throws on undefined, false, -1, "", null values.
function must(value) {
	if (value === undefined || value === false || value === -1 || value === "" || value === null) {
		throw new Error(`must: value assertion; value=${value}`)
	}
	return value
}

export default must
