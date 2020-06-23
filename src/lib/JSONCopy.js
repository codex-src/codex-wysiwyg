// JSON-stringifies and parses a value.
function JSONCopy(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONCopy
