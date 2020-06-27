// Omits keys from a destructued object.
function omitKeys(object, ...keys) {
	const destructed = { ...object }
	for (const each of keys) {
		if (destructed[each] === undefined) {
			throw new Error(`omitKeys: no such key=${JSON.stringify(each)})`)
		}
		destructed[each] = undefined
	}
	return destructed
}

export default omitKeys
