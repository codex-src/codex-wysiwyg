import { sortedTypeMap } from "../components/typeMaps"

// Compares the order of two span types.
function sortFn(type1, type2) {
	const x1 = sortedTypeMap[type1]
	if (x1 === undefined) {
		throw new Error("sortFn: no such type")
	}
	const x2 = sortedTypeMap[type2]
	if (x2 === undefined) {
		throw new Error("sortFn: no such type")
	}
	return x1 - x2
}

// Sorts span types based on render precedence.
function sort(spans) {
	spans.map(each => each.types.sort(sortFn))
	return spans
}

export default sort
