// JSON-encodes and decodes a value; not recommended for
// deeply nested objects because serializing and
// deserializing a value has O(n^2) time complexity.
function JSONClone(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONClone
