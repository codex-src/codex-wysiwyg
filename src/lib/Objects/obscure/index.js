// Obscures a key from a destructured object.
function obscure(object, key) {
	if (object[key] === undefined) {
		throw new Error(`obscure: object[key] === undefined; key=${key}`)
	}
	const { [key]: _, ...omitted } = object
	return omitted
}

export default obscure
