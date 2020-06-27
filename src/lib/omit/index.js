// Omits a key from a destructured object.
function omit(object, key) {
	const { [key]: _, ...omitted } = object
	return omitted
}

export default omit
