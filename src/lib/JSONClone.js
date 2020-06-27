// JSON-encodes and decodes a value; not recommended for
// deep objects.
function JSONClone(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONClone
