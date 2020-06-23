// JSON-stringifies and parses a value.
function JSONClone(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONClone
