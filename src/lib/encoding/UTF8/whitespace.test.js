import { isWhiteSpace } from "./whitespace"

test("isWhiteSpace(...)", () => {
	expect(isWhiteSpace("")).not.toBeTruthy()
	expect(isWhiteSpace("\u0009")).toBeTruthy() // \t
	expect(isWhiteSpace("\u0020")).toBeTruthy() // \n
	expect(isWhiteSpace("\u00A0")).toBeTruthy() // \s -- space
	expect(isWhiteSpace("\u1680")).toBeTruthy()
	expect(isWhiteSpace("\u180E")).toBeTruthy()
	expect(isWhiteSpace("\u2000")).toBeTruthy()
	expect(isWhiteSpace("\u2001")).toBeTruthy()
	expect(isWhiteSpace("\u2002")).toBeTruthy()
	expect(isWhiteSpace("\u2003")).toBeTruthy()
	expect(isWhiteSpace("\u2004")).toBeTruthy()
	expect(isWhiteSpace("\u2005")).toBeTruthy()
	expect(isWhiteSpace("\u2006")).toBeTruthy()
	expect(isWhiteSpace("\u2007")).toBeTruthy()
	expect(isWhiteSpace("\u2008")).toBeTruthy()
	expect(isWhiteSpace("\u2009")).toBeTruthy()
	expect(isWhiteSpace("\u200A")).toBeTruthy()
	expect(isWhiteSpace("\u202F")).toBeTruthy()
	expect(isWhiteSpace("\u205F")).toBeTruthy()
	expect(isWhiteSpace("\u3000")).toBeTruthy()
	expect(isWhiteSpace("\u000A")).toBeTruthy()
	expect(isWhiteSpace("\u000B")).toBeTruthy()
	expect(isWhiteSpace("\u000C")).toBeTruthy()
	expect(isWhiteSpace("\u000D")).toBeTruthy()
	expect(isWhiteSpace("\u0085")).toBeTruthy()
	expect(isWhiteSpace("\u2028")).toBeTruthy()
	expect(isWhiteSpace("\u2029")).toBeTruthy()
})
