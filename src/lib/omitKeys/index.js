// Omits keys from an object.
function omitKeys(object, ...keys) {
	const ommitted = { ...object }
	for (const each of keys) {
		if (ommitted[each] === undefined) {
			// eslint-disable-next-line quotes
			throw new Error(`omitKeys: no such key=${each || `""`})`)
		}
		ommitted[each] = undefined
	}
	return ommitted
}

export default omitKeys
