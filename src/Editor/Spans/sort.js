import { sortedTypeMap } from "../components/typeMaps"

// Compares the order of two span types.
function sortFn(T1, T2) {
	const x1 = sortedTypeMap[T1]
	if (x1 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortFn: no such type (T1=${T1 || `""`})`)
	}
	const x2 = sortedTypeMap[T2]
	if (x2 === undefined) {
		// eslint-disable-next-line quotes
		throw new Error(`sortFn: no such type (T2=${T2 || `""`})`)
	}
	return x1 - x2
}

// Sorts span types based on render precedence.
function sort(spans) {
	// for (const each of spans) {
	// 	each.types.sort(sortFn)
	// }
	spans.map(each => each.types.sort(sortFn))
	return spans
}

export default sort
