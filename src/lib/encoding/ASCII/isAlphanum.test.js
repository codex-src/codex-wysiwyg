import isAlphanum from "./isAlphanum"

test("isAlphanum(...)", () => {
	expect(isAlphanum("")).not.toBeTruthy()
	expect(isAlphanum("a")).toBeTruthy()
	expect(isAlphanum("A")).toBeTruthy()
	expect(isAlphanum("b")).toBeTruthy()
	expect(isAlphanum("B")).toBeTruthy()
	expect(isAlphanum("c")).toBeTruthy()
	expect(isAlphanum("C")).toBeTruthy()
	expect(isAlphanum("d")).toBeTruthy()
	expect(isAlphanum("D")).toBeTruthy()
	expect(isAlphanum("e")).toBeTruthy()
	expect(isAlphanum("E")).toBeTruthy()
	expect(isAlphanum("f")).toBeTruthy()
	expect(isAlphanum("F")).toBeTruthy()
	expect(isAlphanum("g")).toBeTruthy()
	expect(isAlphanum("G")).toBeTruthy()
	expect(isAlphanum("h")).toBeTruthy()
	expect(isAlphanum("H")).toBeTruthy()
	expect(isAlphanum("i")).toBeTruthy()
	expect(isAlphanum("I")).toBeTruthy()
	expect(isAlphanum("j")).toBeTruthy()
	expect(isAlphanum("J")).toBeTruthy()
	expect(isAlphanum("k")).toBeTruthy()
	expect(isAlphanum("K")).toBeTruthy()
	expect(isAlphanum("l")).toBeTruthy()
	expect(isAlphanum("L")).toBeTruthy()
	expect(isAlphanum("m")).toBeTruthy()
	expect(isAlphanum("M")).toBeTruthy()
	expect(isAlphanum("n")).toBeTruthy()
	expect(isAlphanum("N")).toBeTruthy()
	expect(isAlphanum("o")).toBeTruthy()
	expect(isAlphanum("O")).toBeTruthy()
	expect(isAlphanum("p")).toBeTruthy()
	expect(isAlphanum("P")).toBeTruthy()
	expect(isAlphanum("q")).toBeTruthy()
	expect(isAlphanum("Q")).toBeTruthy()
	expect(isAlphanum("r")).toBeTruthy()
	expect(isAlphanum("R")).toBeTruthy()
	expect(isAlphanum("s")).toBeTruthy()
	expect(isAlphanum("S")).toBeTruthy()
	expect(isAlphanum("t")).toBeTruthy()
	expect(isAlphanum("T")).toBeTruthy()
	expect(isAlphanum("u")).toBeTruthy()
	expect(isAlphanum("U")).toBeTruthy()
	expect(isAlphanum("v")).toBeTruthy()
	expect(isAlphanum("V")).toBeTruthy()
	expect(isAlphanum("w")).toBeTruthy()
	expect(isAlphanum("W")).toBeTruthy()
	expect(isAlphanum("x")).toBeTruthy()
	expect(isAlphanum("X")).toBeTruthy()
	expect(isAlphanum("y")).toBeTruthy()
	expect(isAlphanum("Y")).toBeTruthy()
	expect(isAlphanum("z")).toBeTruthy()
	expect(isAlphanum("Z")).toBeTruthy()
	expect(isAlphanum("0")).toBeTruthy()
	expect(isAlphanum("1")).toBeTruthy()
	expect(isAlphanum("2")).toBeTruthy()
	expect(isAlphanum("3")).toBeTruthy()
	expect(isAlphanum("4")).toBeTruthy()
	expect(isAlphanum("5")).toBeTruthy()
	expect(isAlphanum("6")).toBeTruthy()
	expect(isAlphanum("7")).toBeTruthy()
	expect(isAlphanum("8")).toBeTruthy()
	expect(isAlphanum("9")).toBeTruthy()
	expect(isAlphanum("_")).toBeTruthy()
})
