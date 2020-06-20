import { sortedTypeMap } from "../components/typeMaps"

// Compares the order of two synthetic span types.
function sortFn(type1, type2) {
	const x1 = sortedTypeMap[type1]
	if (x1 === undefined) {
		throw new Error("Spans.sortFn: no such type")
	}
	const x2 = sortedTypeMap[type2]
	if (x2 === undefined) {
		throw new Error("Spans.sortFn: no such type")
	}
	return x1 - x2
}

// Sorts synthetic span types based on render precedence.
function sort(spans) {
	spans.map(each => each.types.sort(sortFn))
	return spans
}

export default sort
