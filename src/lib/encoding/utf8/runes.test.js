import {
	atEnd,
	atStart,
} from "./runes"

test("atStart", () => {
	expect(atStart("")).toBe("")
	expect(atStart("abc")).toBe("a")
	expect(atStart("bca")).toBe("b")
	expect(atStart("cab")).toBe("c")
	expect(atStart("😀😃😄")).toBe("😀")
	expect(atStart("😃😄😀")).toBe("😃")
	expect(atStart("😄😀😃")).toBe("😄")
})

test("atEnd", () => {
	expect(atEnd("")).toBe("")
	expect(atEnd("abc")).toBe("c")
	expect(atEnd("bca")).toBe("a")
	expect(atEnd("cab")).toBe("b")
	expect(atEnd("😀😃😄")).toBe("😄")
	expect(atEnd("😃😄😀")).toBe("😀")
	expect(atEnd("😄😀😃")).toBe("😃")
})
