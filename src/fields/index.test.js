import {
	fieldIsContainedLHS,
	fieldIsContainedRHS,
	fieldIsTotallyContained,
	fieldsArePartiallyIntersected,
	fieldsAreTotallyIntersected,
	fieldsDoNotIntersect,
} from "./index"

// +-------+-------+    +-------+ +-------+
// |       |\\\\\\\|    |       | |\\\\\\\|
// |   A   |\\\B\\\| or |   A   | |\\\B\\\|
// |       |\\\\\\\|    |       | |\\\\\\\|
// +-------+-------+    +-------+ +-------+
//
test("fieldsDoNotIntersect", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 3,
		offsetEnd: 6,
	}
	expect(fieldsDoNotIntersect(fieldA, fieldB)).toBe(true)
})

//   +---+---+---+
//   |   |\\\|\\\|
//   | A |\\\B\\\|
//   |   |\\\|\\\|
//   +---+---+---+
//
test("fieldsArePartiallyIntersected", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 2,
		offsetEnd: 5,
	}
	expect(fieldsArePartiallyIntersected(fieldA, fieldB)).toBe(true)
})

//     +-------+
//     |\\\\\\\|
//     |\\\B\\\| A
//     |\\\\\\\|
//     +-------+
//
test("fieldsAreTotallyIntersected", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	expect(fieldsAreTotallyIntersected(fieldA, fieldB)).toBe(true)
})

//     +---+---+
//     |   |\\\|
//     | A |\B\|
//     |   |\\\|
//     +---+---+
//
test("fieldIsContainedRHS", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 2,
		offsetEnd: 3,
	}
	expect(fieldIsContainedRHS(fieldA, fieldB)).toBe(true)
})

//     +-+---+-+
//     | |\\\| |
//     | |\B\| | A
//     | |\\\| |
//     +-+---+-+
//
test("fieldIsTotallyContained", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 1,
		offsetEnd: 2,
	}
	expect(fieldIsTotallyContained(fieldA, fieldB)).toBe(true)
})

//     +---+---+
//     |\\\|   |
//     |\B\| A |
//     |\\\|   |
//     +---+---+
//
test("fieldIsContainedLHS", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 0,
		offsetEnd: 1,
	}
	expect(fieldIsContainedLHS(fieldA, fieldB)).toBe(true)
})
