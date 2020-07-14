// Throws on undefined, false, -1, "", null values.
function must(value) {
	if (value === undefined || value === false || value === -1 || value === "" || value === null) {
		throw new Error(`FIXME: value=${JSON.stringify(value)}`)
	}
	return value
}

export default must
