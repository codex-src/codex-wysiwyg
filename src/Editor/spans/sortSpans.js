const sortedTypes = [
	"a",
	"code",
	"strike",
	"strong",
	"em",
]

// Precomputes sort order based on sortedTypes.
const sortedTypesMap = { // TODO: Use typeMap
	[sortedTypes[0]]: 0,
	[sortedTypes[1]]: 1,
	[sortedTypes[2]]: 2,
	[sortedTypes[3]]: 3,
	[sortedTypes[4]]: 4,
}

// Compares the order of two span types.
function sortSpanTypes(t1, t2) {
	const x1 = sortedTypesMap[t1]
	if (x1 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortSpanTypes: no such type (t1=${t1 || `""`})`)
	}
	const x2 = sortedTypesMap[t2]
	if (x2 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortSpanTypes: no such type (t2=${t2 || `""`})`)
	}
	return x1 - x2
}

// Sorts span types based on render precedence.
function sortSpans(spans) {
	for (const each of spans) {
		each.types.sort(sortSpanTypes)
	}
	return spans
}

export default sortSpans
