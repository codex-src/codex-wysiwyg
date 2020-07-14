import { testWhitespace } from "./index"

test("testWhitespace(...)", () => {
	expect(testWhitespace("")).not.toBeTruthy()
	expect(testWhitespace("\u0009")).toBeTruthy() // \t
	expect(testWhitespace("\u0020")).toBeTruthy() // \n
	expect(testWhitespace("\u00A0")).toBeTruthy() // \s -- space
	expect(testWhitespace("\u1680")).toBeTruthy()
	expect(testWhitespace("\u180E")).toBeTruthy()
	expect(testWhitespace("\u2000")).toBeTruthy()
	expect(testWhitespace("\u2001")).toBeTruthy()
	expect(testWhitespace("\u2002")).toBeTruthy()
	expect(testWhitespace("\u2003")).toBeTruthy()
	expect(testWhitespace("\u2004")).toBeTruthy()
	expect(testWhitespace("\u2005")).toBeTruthy()
	expect(testWhitespace("\u2006")).toBeTruthy()
	expect(testWhitespace("\u2007")).toBeTruthy()
	expect(testWhitespace("\u2008")).toBeTruthy()
	expect(testWhitespace("\u2009")).toBeTruthy()
	expect(testWhitespace("\u200A")).toBeTruthy()
	expect(testWhitespace("\u202F")).toBeTruthy()
	expect(testWhitespace("\u205F")).toBeTruthy()
	expect(testWhitespace("\u3000")).toBeTruthy()
	expect(testWhitespace("\u000A")).toBeTruthy()
	expect(testWhitespace("\u000B")).toBeTruthy()
	expect(testWhitespace("\u000C")).toBeTruthy()
	expect(testWhitespace("\u000D")).toBeTruthy()
	expect(testWhitespace("\u0085")).toBeTruthy()
	expect(testWhitespace("\u2028")).toBeTruthy()
	expect(testWhitespace("\u2029")).toBeTruthy()
})
