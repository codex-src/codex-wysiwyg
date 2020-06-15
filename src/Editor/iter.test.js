import * as iter from "./iter"

test("backwards-rune", () => {
	expect(iter.rtl.rune("Hello, world!", 0)).toBe(0)
	expect(iter.rtl.rune("Hello, world!", 5)).toBe(1)
	expect(iter.rtl.rune("Hello, world!", 6)).toBe(1)
	expect(iter.rtl.rune("Hello, world!", 7)).toBe(1)
	expect(iter.rtl.rune("Hello, world!", 12)).toBe(1)
	expect(iter.rtl.rune("Hello, world!", 13)).toBe(1)
})

test("backwards-word", () => {
	expect(iter.rtl.word("Hello, world!", 0)).toBe(0)
	expect(iter.rtl.word("Hello, world!", 5)).toBe(5)
	expect(iter.rtl.word("Hello, world!", 6)).toBe(1)
	expect(iter.rtl.word("Hello, world!", 7)).toBe(2)
	expect(iter.rtl.word("Hello, world!", 12)).toBe(5)
	expect(iter.rtl.word("Hello, world!", 13)).toBe(1)
})

test("backwards-line", () => {
	expect(iter.rtl.line("Hello, world!", 0)).toBe(0)
	expect(iter.rtl.line("Hello, world!", 5)).toBe(5)
	expect(iter.rtl.line("Hello, world!", 6)).toBe(6)
	expect(iter.rtl.line("Hello, world!", 7)).toBe(7)
	expect(iter.rtl.line("Hello, world!", 12)).toBe(12)
	expect(iter.rtl.line("Hello, world!", 13)).toBe(13)
})

test("forwards-rune", () => {
	expect(iter.ltr.rune("Hello, world!", 0)).toBe(1)
	expect(iter.ltr.rune("Hello, world!", 5)).toBe(1)
	expect(iter.ltr.rune("Hello, world!", 6)).toBe(1)
	expect(iter.ltr.rune("Hello, world!", 7)).toBe(1)
	expect(iter.ltr.rune("Hello, world!", 12)).toBe(1)
	expect(iter.ltr.rune("Hello, world!", 13)).toBe(0)
})

test("forwards-word", () => {
	expect(iter.ltr.word("Hello, world!", 0)).toBe(5)
	expect(iter.ltr.word("Hello, world!", 5)).toBe(1)
	expect(iter.ltr.word("Hello, world!", 6)).toBe(6)
	expect(iter.ltr.word("Hello, world!", 7)).toBe(5)
	expect(iter.ltr.word("Hello, world!", 12)).toBe(1)
	expect(iter.ltr.word("Hello, world!", 13)).toBe(0)
})
