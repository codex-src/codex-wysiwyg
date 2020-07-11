import { // Unsorted
	rune,
	word,
} from "./ltr"

test("scans left-to-right runes", () => {
	expect(rune("\n\n😀 !dlrow ,olleH\n\n")).toBe("\n")
	expect(rune("\n😀 !dlrow ,olleH\n\n")).toBe("\n")
	expect(rune("😀 !dlrow ,olleH\n\n")).toBe("😀")
	expect(rune(" !dlrow ,olleH\n\n")).toBe(" ")
	expect(rune("!dlrow ,olleH\n\n")).toBe("!")
	expect(rune("dlrow ,olleH\n\n")).toBe("d")
	expect(rune(" ,olleH\n\n")).toBe(" ")
	expect(rune(",olleH\n\n")).toBe(",")
	expect(rune("olleH\n\n")).toBe("o")
	expect(rune("\n\n")).toBe("\n")
	expect(rune("\n")).toBe("\n")
	expect(rune("")).toBe("")
})

test("scans left-to-right words", () => {
	expect(word("\n\n😀 !dlrow ,olleH\n\n")).toBe("\n")
	expect(word("\n😀 !dlrow ,olleH\n\n")).toBe("\n")
	expect(word("😀 !dlrow ,olleH\n\n")).toBe("😀")
	expect(word(" !dlrow ,olleH\n\n")).toBe(" !")
	expect(word("!dlrow ,olleH\n\n")).toBe("!")
	expect(word("dlrow ,olleH\n\n")).toBe("dlrow")
	expect(word(" ,olleH\n\n")).toBe(" ,")
	expect(word(",olleH\n\n")).toBe(",")
	expect(word("olleH\n\n")).toBe("olleH")
	expect(word("\n\n")).toBe("\n")
	expect(word("\n")).toBe("\n")
	expect(word("")).toBe("")
})
