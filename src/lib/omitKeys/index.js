// Omits keys from an object.
function omitKeys(object, ...keys) {
	const ommitted = { ...object }
	for (const each of keys) {
		if (ommitted[each] === undefined) {
			throw new Error(`omitKeys: no such key=${JSON.stringify(each)})`)
		}
		ommitted[each] = undefined
	}
	return ommitted
}

export default omitKeys
