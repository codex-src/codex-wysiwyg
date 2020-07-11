import { // Unsorted
	rune,
	word,
	line,
} from "./rtl"

test("scans right-to-left runes", () => {
	expect(rune("")).toBe("")
	expect(rune("\n")).toBe("\n")
	expect(rune("\n\n")).toBe("\n")
	expect(rune("\n\nHello")).toBe("o")
	expect(rune("\n\nHello,")).toBe(",")
	expect(rune("\n\nHello, ")).toBe(" ")
	expect(rune("\n\nHello, world")).toBe("d")
	expect(rune("\n\nHello, world!")).toBe("!")
	expect(rune("\n\nHello, world! ")).toBe(" ")
	expect(rune("\n\nHello, world! 😀")).toBe("😀")
	expect(rune("\n\nHello, world! 😀\n")).toBe("\n")
	expect(rune("\n\nHello, world! 😀\n\n")).toBe("\n")
})

test("scans right-to-left words", () => {
	expect(word("")).toBe("")
	expect(word("\n")).toBe("\n")
	expect(word("\n\n")).toBe("\n")
	expect(word("\n\nHello")).toBe("Hello")
	expect(word("\n\nHello,")).toBe(",")
	expect(word("\n\nHello, ")).toBe(", ")
	expect(word("\n\nHello, world")).toBe("world")
	expect(word("\n\nHello, world!")).toBe("!")
	expect(word("\n\nHello, world! ")).toBe("! ")
	expect(word("\n\nHello, world! 😀")).toBe("😀")
	expect(word("\n\nHello, world! 😀\n")).toBe("\n")
	expect(word("\n\nHello, world! 😀\n\n")).toBe("\n")
})

test("scans right-to-left lines", () => {
	expect(line("")).toBe("")
	expect(line("\n")).toBe("\n")
	expect(line("\n\n")).toBe("\n")
	expect(line("\n\nHello")).toBe("Hello")
	expect(line("\n\nHello,")).toBe("Hello,")
	expect(line("\n\nHello, ")).toBe("Hello, ")
	expect(line("\n\nHello, world")).toBe("Hello, world")
	expect(line("\n\nHello, world!")).toBe("Hello, world!")
	expect(line("\n\nHello, world! ")).toBe("Hello, world! ")
	expect(line("\n\nHello, world! 😀")).toBe("Hello, world! 😀")
	expect(line("\n\nHello, world! 😀\n")).toBe("\n")
	expect(line("\n\nHello, world! 😀\n\n")).toBe("\n")
})
