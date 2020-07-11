import keyCodeFor from "./index"

test("", () => {
	expect(keyCodeFor("Escape")).toBe(27)

	expect(keyCodeFor("`")).toBe(192)
	expect(keyCodeFor("~")).toBe(192)
	expect(keyCodeFor("1")).toBe(49)
	expect(keyCodeFor("!")).toBe(49)
	expect(keyCodeFor("2")).toBe(50)
	expect(keyCodeFor("@")).toBe(50)
	expect(keyCodeFor("3")).toBe(51)
	expect(keyCodeFor("#")).toBe(51)
	expect(keyCodeFor("4")).toBe(52)
	expect(keyCodeFor("$")).toBe(52)
	expect(keyCodeFor("5")).toBe(53)
	expect(keyCodeFor("%")).toBe(53)
	expect(keyCodeFor("6")).toBe(54)
	expect(keyCodeFor("^")).toBe(54)
	expect(keyCodeFor("7")).toBe(55)
	expect(keyCodeFor("&")).toBe(55)
	expect(keyCodeFor("8")).toBe(56)
	expect(keyCodeFor("*")).toBe(56)
	expect(keyCodeFor("9")).toBe(57)
	expect(keyCodeFor("(")).toBe(57)
	expect(keyCodeFor("0")).toBe(48)
	expect(keyCodeFor(")")).toBe(48)
	expect(keyCodeFor("-")).toBe(189)
	expect(keyCodeFor("_")).toBe(189)
	expect(keyCodeFor("=")).toBe(187)
	expect(keyCodeFor("+")).toBe(187)
	expect(keyCodeFor("Backspace")).toBe(8)
	expect(keyCodeFor("Delete")).toBe(46)

	expect(keyCodeFor("Tab")).toBe(9)
	expect(keyCodeFor("q")).toBe(81)
	expect(keyCodeFor("Q")).toBe(81)
	expect(keyCodeFor("w")).toBe(87)
	expect(keyCodeFor("W")).toBe(87)
	expect(keyCodeFor("e")).toBe(69)
	expect(keyCodeFor("E")).toBe(69)
	expect(keyCodeFor("r")).toBe(82)
	expect(keyCodeFor("R")).toBe(82)
	expect(keyCodeFor("t")).toBe(84)
	expect(keyCodeFor("T")).toBe(84)
	expect(keyCodeFor("y")).toBe(89)
	expect(keyCodeFor("Y")).toBe(89)
	expect(keyCodeFor("u")).toBe(85)
	expect(keyCodeFor("U")).toBe(85)
	expect(keyCodeFor("i")).toBe(73)
	expect(keyCodeFor("I")).toBe(73)
	expect(keyCodeFor("o")).toBe(79)
	expect(keyCodeFor("O")).toBe(79)
	expect(keyCodeFor("p")).toBe(80)
	expect(keyCodeFor("P")).toBe(80)
	expect(keyCodeFor("[")).toBe(219)
	expect(keyCodeFor("{")).toBe(219)
	expect(keyCodeFor("]")).toBe(221)
	expect(keyCodeFor("}")).toBe(221)
	expect(keyCodeFor("\\")).toBe(220)
	expect(keyCodeFor("|")).toBe(220)

	expect(keyCodeFor("CapsLock")).toBe(20)
	expect(keyCodeFor("a")).toBe(65)
	expect(keyCodeFor("A")).toBe(65)
	expect(keyCodeFor("s")).toBe(83)
	expect(keyCodeFor("S")).toBe(83)
	expect(keyCodeFor("d")).toBe(68)
	expect(keyCodeFor("D")).toBe(68)
	expect(keyCodeFor("f")).toBe(70)
	expect(keyCodeFor("F")).toBe(70)
	expect(keyCodeFor("g")).toBe(71)
	expect(keyCodeFor("G")).toBe(71)
	expect(keyCodeFor("h")).toBe(72)
	expect(keyCodeFor("H")).toBe(72)
	expect(keyCodeFor("j")).toBe(74)
	expect(keyCodeFor("J")).toBe(74)
	expect(keyCodeFor("k")).toBe(75)
	expect(keyCodeFor("K")).toBe(75)
	expect(keyCodeFor("l")).toBe(76)
	expect(keyCodeFor("L")).toBe(76)
	expect(keyCodeFor(";")).toBe(186)
	expect(keyCodeFor(":")).toBe(186)
	expect(keyCodeFor("'")).toBe(222)
	expect(keyCodeFor("\"")).toBe(222)
	expect(keyCodeFor("Enter")).toBe(13)

	expect(keyCodeFor("Shift")).toBe(16)
	expect(keyCodeFor("z")).toBe(90)
	expect(keyCodeFor("Z")).toBe(90)
	expect(keyCodeFor("x")).toBe(88)
	expect(keyCodeFor("X")).toBe(88)
	expect(keyCodeFor("c")).toBe(67)
	expect(keyCodeFor("C")).toBe(67)
	expect(keyCodeFor("v")).toBe(86)
	expect(keyCodeFor("V")).toBe(86)
	expect(keyCodeFor("b")).toBe(66)
	expect(keyCodeFor("B")).toBe(66)
	expect(keyCodeFor("n")).toBe(78)
	expect(keyCodeFor("N")).toBe(78)
	expect(keyCodeFor("m")).toBe(77)
	expect(keyCodeFor("M")).toBe(77)
	expect(keyCodeFor(",")).toBe(188)
	expect(keyCodeFor("<")).toBe(188)
	expect(keyCodeFor(".")).toBe(190)
	expect(keyCodeFor(">")).toBe(190)
	expect(keyCodeFor("/")).toBe(191)
	expect(keyCodeFor("?")).toBe(191)

	expect(keyCodeFor("Control")).toBe(17)
	expect(keyCodeFor("Alt")).toBe(18)
	expect(keyCodeFor("Meta")).toBe(91)
	expect(keyCodeFor("Space")).toBe(32)
	expect(keyCodeFor("ArrowLeft")).toBe(37)
	expect(keyCodeFor("ArrowUp")).toBe(38)
	expect(keyCodeFor("ArrowDown")).toBe(40)
	expect(keyCodeFor("ArrowRight")).toBe(39)

	expect(() => keyCodeFor("foo")).toThrow()
})