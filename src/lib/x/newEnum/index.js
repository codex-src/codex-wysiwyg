// Creates a new enumerated map. Note that an enum cannot be
// mutated once created.
const newEnum = (...enumKeys) => Object.freeze({
	...enumKeys.reduce((acc, each) => {
		acc[each] = each
		return acc
	}, {}),
})

export default newEnum
