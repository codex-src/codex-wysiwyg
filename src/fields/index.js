// +-------+-------+    +-------+ +-------+
// |       |\\\\\\\|    |       | |\\\\\\\|
// |   A   |\\\B\\\| or |   A   | |\\\B\\\|
// |       |\\\\\\\|    |       | |\\\\\\\|
// +-------+-------+    +-------+ +-------+
//
export function fieldsDoNotIntersect(fieldA, fieldB) {
	return fieldB.offsetStart >= fieldA.offsetEnd
}

//   +---+---+---+
//   |   |\\\|\\\|
//   | A |\\\B\\\|
//   |   |\\\|\\\|
//   +---+---+---+
//
export function fieldsArePartiallyIntersected(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart < fieldA.offsetEnd &&
		fieldB.offsetEnd > fieldA.offsetEnd
	)
	return ok
}

//     +-------+
//     |\\\\\\\|
//     |\\\B\\\| A
//     |\\\\\\\|
//     +-------+
//
export function fieldsAreTotallyIntersected(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart === fieldA.offsetStart &&
		fieldB.offsetEnd === fieldA.offsetEnd
	)
	return ok
}

//     +---+---+
//     |   |\\\|
//     | A |\B\|
//     |   |\\\|
//     +---+---+
//
export function fieldIsContainedRHS(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart > fieldA.offsetStart &&
		fieldB.offsetEnd === fieldA.offsetEnd
	)
	return ok
}

//     +-+---+-+
//     | |\\\| |
//     | |\B\| | A
//     | |\\\| |
//     +-+---+-+
//
export function fieldIsContained(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart > fieldA.offsetStart &&
		fieldB.offsetEnd < fieldA.offsetEnd
	)
	return ok
}

//     +---+---+
//     |\\\|   |
//     |\B\| A |
//     |\\\|   |
//     +---+---+
//
export function fieldIsContainedLHS(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart === fieldA.offsetStart &&
		fieldB.offsetEnd < fieldA.offsetEnd
	)
	return ok
}
