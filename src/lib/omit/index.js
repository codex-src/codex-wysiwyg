// Omits a key from a destructured object.
function omit(object, key) {
	if (object[key] === undefined) {
		throw new Error(`omit: object[key] === undefined; key=${key}`)
	}
	const { [key]: _, ...omitted } = object
	return omitted
}

export default omit
