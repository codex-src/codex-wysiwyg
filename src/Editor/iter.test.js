import * as iter from "./iter"

test("backwards-rune", () => {
	expect(iter.backwards.rune("Hello, world!", 0)).toBe(0)
	expect(iter.backwards.rune("Hello, world!", 5)).toBe(1)
	expect(iter.backwards.rune("Hello, world!", 6)).toBe(1)
	expect(iter.backwards.rune("Hello, world!", 7)).toBe(1)
	expect(iter.backwards.rune("Hello, world!", 12)).toBe(1)
	expect(iter.backwards.rune("Hello, world!", 13)).toBe(1)
})

test("backwards-word", () => {
	expect(iter.backwards.word("Hello, world!", 0)).toBe(0)
	expect(iter.backwards.word("Hello, world!", 5)).toBe(5)
	expect(iter.backwards.word("Hello, world!", 6)).toBe(1)
	expect(iter.backwards.word("Hello, world!", 7)).toBe(2)
	expect(iter.backwards.word("Hello, world!", 12)).toBe(5)
	expect(iter.backwards.word("Hello, world!", 13)).toBe(1)
})

test("backwards-paragraph", () => {
	expect(iter.backwards.paragraph("Hello, world!", 0)).toBe(0)
	expect(iter.backwards.paragraph("Hello, world!", 5)).toBe(5)
	expect(iter.backwards.paragraph("Hello, world!", 6)).toBe(6)
	expect(iter.backwards.paragraph("Hello, world!", 7)).toBe(7)
	expect(iter.backwards.paragraph("Hello, world!", 12)).toBe(12)
	expect(iter.backwards.paragraph("Hello, world!", 13)).toBe(13)
})

test("forwards-rune", () => {
	expect(iter.forwards.rune("Hello, world!", 0)).toBe(1)
	expect(iter.forwards.rune("Hello, world!", 5)).toBe(1)
	expect(iter.forwards.rune("Hello, world!", 6)).toBe(1)
	expect(iter.forwards.rune("Hello, world!", 7)).toBe(1)
	expect(iter.forwards.rune("Hello, world!", 12)).toBe(1)
	expect(iter.forwards.rune("Hello, world!", 13)).toBe(0)
})

test("forwards-word", () => {
	expect(iter.forwards.word("Hello, world!", 0)).toBe(5)
	expect(iter.forwards.word("Hello, world!", 5)).toBe(1)
	expect(iter.forwards.word("Hello, world!", 6)).toBe(6)
	expect(iter.forwards.word("Hello, world!", 7)).toBe(5)
	expect(iter.forwards.word("Hello, world!", 12)).toBe(1)
	expect(iter.forwards.word("Hello, world!", 13)).toBe(0)
})
