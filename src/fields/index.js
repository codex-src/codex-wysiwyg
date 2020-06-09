// +-------+-------+    +-------+ +-------+
// |       |\\\\\\\|    |       | |\\\\\\\|
// |   A   |\\\B\\\| or |   A   | |\\\B\\\|
// |       |\\\\\\\|    |       | |\\\\\\\|
// +-------+-------+    +-------+ +-------+
//
export function fieldsDoNotOverlap(fieldA, fieldB) {
	return fieldB.offsetStart >= fieldA.offsetEnd
}

// +---+---+---+
// |   |\\\|\\\|
// | A |\\\B\\\|
// |   |\\\|\\\|
// +---+---+---+
//
export function fieldsPartiallyOverlap(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart < fieldA.offsetEnd &&
		fieldB.offsetEnd > fieldA.offsetEnd
	)
	return ok
}

// +-------+
// |\\\\\\\|
// |\\\B\\\|
// |\\\\\\\|
// +-------+
//
export function fieldsTotallyOverlap(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart === fieldA.offsetStart &&
		fieldB.offsetEnd === fieldA.offsetEnd
	)
	return ok
}

// +---+---+    +-+---+-+    +---+---+
// |   |\\\|    | |\\\| |    |\\\|   |
// | A |\B\| or | |\B\| | or |\B\| A |
// |   |\\\|    | |\\\| |    |\\\|   |
// +---+---+    +-+---+-+    +---+---+
//
export function fieldsAreContained(fieldA, fieldB) {
	const ok = (
		fieldB.offsetStart >= fieldA.offsetStart &&
		fieldB.offsetEnd <= fieldA.offsetEnd
	)
	return ok
}
