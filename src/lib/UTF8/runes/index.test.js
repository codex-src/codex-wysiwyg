import {
	atEnd,
	atStart,
} from "./index"

test("atStart(...)", () => {
	expect(atStart("Hello, world!")).toBe("H")
	expect(atStart("ello, world!")).toBe("e")
	expect(atStart("llo, world!")).toBe("l")
	expect(atStart("lo, world!")).toBe("l")
	expect(atStart("o, world!")).toBe("o")
	expect(atStart(", world!")).toBe(",")
	expect(atStart(" world!")).toBe(" ")
	expect(atStart("world!")).toBe("w")
	expect(atStart("orld!")).toBe("o")
	expect(atStart("rld!")).toBe("r")
	expect(atStart("ld!")).toBe("l")
	expect(atStart("d!")).toBe("d")
	expect(atStart("!")).toBe("!")
	expect(atStart("")).toBe("")
})

test("atEnd(...)", () => {
	expect(atEnd("Hello, world!")).toBe("!")
	expect(atEnd("Hello, world")).toBe("d")
	expect(atEnd("Hello, worl")).toBe("l")
	expect(atEnd("Hello, wor")).toBe("r")
	expect(atEnd("Hello, wo")).toBe("o")
	expect(atEnd("Hello, w")).toBe("w")
	expect(atEnd("Hello, ")).toBe(" ")
	expect(atEnd("Hello,")).toBe(",")
	expect(atEnd("Hello")).toBe("o")
	expect(atEnd("Hell")).toBe("l")
	expect(atEnd("Hel")).toBe("l")
	expect(atEnd("He")).toBe("e")
	expect(atEnd("H")).toBe("H")
	expect(atEnd("")).toBe("")
})
