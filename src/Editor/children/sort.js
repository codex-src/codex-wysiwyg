const sortedTypes = [
	"a",
	"code",
	"strike",
	"strong",
	"em",
]

// Precomputes sort order based on sortedTypes.
const sortedTypesMap = {
	[sortedTypes[0]]: 0,
	[sortedTypes[1]]: 1,
	[sortedTypes[2]]: 2,
	[sortedTypes[3]]: 3,
	[sortedTypes[4]]: 4,
}

// Sort function for sorting types based on render
// precedence (see sortedTypes).
function sortTypesFn(type1, type2) {
	const x1 = sortedTypesMap[type1]
	if (x1 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortTypesFn: no such type (type1=${type1 || `""`})`)
	}
	const x2 = sortedTypesMap[type2]
	if (x2 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortTypesFn: no such type (type2=${type2 || `""`})`)
	}
	return x1 - x2
}

// Sorts children.types based on render precedence.
function sort(children) {
	children.types.sort(sortTypesFn)
	return children
}

export default sort
