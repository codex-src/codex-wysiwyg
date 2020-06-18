const sortedTypes = [
	"a",
	"code",
	"strike",
	"strong",
	"em",
]

// Sort function for sorting types based on render
// precedence (see sortedTypes).
function sortTypesFn(type1, type2) {
	let x1 = -1
	let x2 = -1
	for (let x = 0; x < sortedTypes.length; x++) {
		if (type1 === sortedTypes[x]) {
			x1 = x
		}
		if (type2 === sortedTypes[x]) {
			x2 = x
		}
		if (x1 >= 0 && x2 >= 0) {
			// No-op
			break
		}
	}
	if (x1 === -1) {
		// eslint-disable-next-line quotes
		throw new Error(`sortTypesFn: no such type (type1=${type1 || `""`})`)
	} else if (x2 === -1) {
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
