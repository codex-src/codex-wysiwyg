import {
	fieldsAreContained,
	fieldsDoNotOverlap,
	fieldsPartiallyOverlap,
	fieldsTotallyOverlap,
} from "./index"

// +-------+-------+    +-------+ +-------+
// |       |\\\\\\\|    |       | |\\\\\\\|
// |   A   |\\\B\\\| or |   A   | |\\\B\\\|
// |       |\\\\\\\|    |       | |\\\\\\\|
// +-------+-------+    +-------+ +-------+
//
test("fieldsDoNotOverlap", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 3,
		offsetEnd: 6,
	}
	expect(fieldsDoNotOverlap(fieldA, fieldB)).toBe(true)
})

// +---+---+---+
// |   |\\\|\\\|
// | A |\\\B\\\|
// |   |\\\|\\\|
// +---+---+---+
//
test("fieldsPartiallyOverlap", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 2,
		offsetEnd: 5,
	}
	expect(fieldsPartiallyOverlap(fieldA, fieldB)).toBe(true)
})

// +-------+
// |\\\\\\\|
// |\\\B\\\|
// |\\\\\\\|
// +-------+
//
test("fieldsTotallyOverlap", () => {
	const fieldA = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	const fieldB = {
		offsetStart: 0,
		offsetEnd: 3,
	}
	expect(fieldsTotallyOverlap(fieldA, fieldB)).toBe(true)
})

// +---+---+    +-+---+-+    +---+---+
// |   |\\\|    | |\\\| |    |\\\|   |
// | A |\B\| or | |\B\| | or |\B\| A |
// |   |\\\|    | |\\\| |    |\\\|   |
// +---+---+    +-+---+-+    +---+---+
//
describe("fieldsAreNested", () => {
	test("rhs", () => {
		const fieldA = {
			offsetStart: 0,
			offsetEnd: 3,
		}
		const fieldB = {
			offsetStart: 2,
			offsetEnd: 3,
		}
		expect(fieldsAreContained(fieldA, fieldB)).toBe(true)
	})
	test("center", () => {
		const fieldA = {
			offsetStart: 0,
			offsetEnd: 3,
		}
		const fieldB = {
			offsetStart: 1,
			offsetEnd: 2,
		}
		expect(fieldsAreContained(fieldA, fieldB)).toBe(true)
	})
	test("lhs", () => {
		const fieldA = {
			offsetStart: 0,
			offsetEnd: 3,
		}
		const fieldB = {
			offsetStart: 0,
			offsetEnd: 1,
		}
		expect(fieldsAreContained(fieldA, fieldB)).toBe(true)
	})
})
