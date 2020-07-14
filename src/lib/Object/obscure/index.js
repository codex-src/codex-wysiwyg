// Obscures a key from a destructured object.
function obscure(object, key) {
	if (object[key] === undefined) {
		throw new Error(`obscure: object[key] === undefined; key=${key}`)
	}
	const { [key]: _, ...obscured } = object
	if (!Object.keys(obscured).length) {
		return null
	}
	return obscured
}

export default obscure
