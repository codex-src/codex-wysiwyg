import * as rtl from "./rtl"

test("rtl.rune(...)", () => {
	expect(rtl.rune("")).toBe("")
	expect(rtl.rune("\n")).toBe("\n")
	expect(rtl.rune("\n\n")).toBe("\n")
	expect(rtl.rune("\n\nHello")).toBe("o")
	expect(rtl.rune("\n\nHello,")).toBe(",")
	expect(rtl.rune("\n\nHello, ")).toBe(" ")
	expect(rtl.rune("\n\nHello, world")).toBe("d")
	expect(rtl.rune("\n\nHello, world!")).toBe("!")
	expect(rtl.rune("\n\nHello, world! ")).toBe(" ")
	expect(rtl.rune("\n\nHello, world! 😀")).toBe("😀")
	expect(rtl.rune("\n\nHello, world! 😀\n")).toBe("\n")
	expect(rtl.rune("\n\nHello, world! 😀\n\n")).toBe("\n")
})

test("rtl.word(...)", () => {
	expect(rtl.word("")).toBe("")
	expect(rtl.word("\n")).toBe("\n")
	expect(rtl.word("\n\n")).toBe("\n")
	expect(rtl.word("\n\nHello")).toBe("Hello")
	expect(rtl.word("\n\nHello,")).toBe(",")
	expect(rtl.word("\n\nHello, ")).toBe(", ")
	expect(rtl.word("\n\nHello, world")).toBe("world")
	expect(rtl.word("\n\nHello, world!")).toBe("!")
	expect(rtl.word("\n\nHello, world! ")).toBe("! ")
	expect(rtl.word("\n\nHello, world! 😀")).toBe("😀")
	expect(rtl.word("\n\nHello, world! 😀\n")).toBe("\n")
	expect(rtl.word("\n\nHello, world! 😀\n\n")).toBe("\n")
})

test("rtl.line(...)", () => {
	expect(rtl.line("")).toBe("")
	expect(rtl.line("\n")).toBe("\n")
	expect(rtl.line("\n\n")).toBe("\n")
	expect(rtl.line("\n\nHello")).toBe("Hello")
	expect(rtl.line("\n\nHello,")).toBe("Hello,")
	expect(rtl.line("\n\nHello, ")).toBe("Hello, ")
	expect(rtl.line("\n\nHello, world")).toBe("Hello, world")
	expect(rtl.line("\n\nHello, world!")).toBe("Hello, world!")
	expect(rtl.line("\n\nHello, world! ")).toBe("Hello, world! ")
	expect(rtl.line("\n\nHello, world! 😀")).toBe("Hello, world! 😀")
	expect(rtl.line("\n\nHello, world! 😀\n")).toBe("\n")
	expect(rtl.line("\n\nHello, world! 😀\n\n")).toBe("\n")
})