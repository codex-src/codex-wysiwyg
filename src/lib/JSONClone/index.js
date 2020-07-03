// JSON-encodes and decodes a value.
function JSONClone(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONClone
