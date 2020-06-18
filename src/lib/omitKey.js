// Omits a key from a destructured object.
function omitKey(object, key) {
	const { [key]: omitted, ...destructured } = object
	if (omitted === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`omitKey: no such key (key=${key || `""`})`)
	}
	return destructured
}

export default omitKey
