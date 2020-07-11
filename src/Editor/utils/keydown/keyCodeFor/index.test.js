import keyCodeFor from "./index"

describe("row 1", () => {
	test("keyCodeFor('Escape')", () => expect(keyCodeFor("Escape")).toBe(27))
})

describe("row 2", () => {
	test("keyCodeFor('`')", () => expect(keyCodeFor("`")).toBe(192))
	test("keyCodeFor('~')", () => expect(keyCodeFor("~")).toBe(192))
	test("keyCodeFor('1')", () => expect(keyCodeFor("1")).toBe(49))
	test("keyCodeFor('!')", () => expect(keyCodeFor("!")).toBe(49))
	test("keyCodeFor('2')", () => expect(keyCodeFor("2")).toBe(50))
	test("keyCodeFor('@')", () => expect(keyCodeFor("@")).toBe(50))
	test("keyCodeFor('3')", () => expect(keyCodeFor("3")).toBe(51))
	test("keyCodeFor('#')", () => expect(keyCodeFor("#")).toBe(51))
	test("keyCodeFor('4')", () => expect(keyCodeFor("4")).toBe(52))
	test("keyCodeFor('$')", () => expect(keyCodeFor("$")).toBe(52))
	test("keyCodeFor('5')", () => expect(keyCodeFor("5")).toBe(53))
	test("keyCodeFor('%')", () => expect(keyCodeFor("%")).toBe(53))
	test("keyCodeFor('6')", () => expect(keyCodeFor("6")).toBe(54))
	test("keyCodeFor('^')", () => expect(keyCodeFor("^")).toBe(54))
	test("keyCodeFor('7')", () => expect(keyCodeFor("7")).toBe(55))
	test("keyCodeFor('&')", () => expect(keyCodeFor("&")).toBe(55))
	test("keyCodeFor('8')", () => expect(keyCodeFor("8")).toBe(56))
	test("keyCodeFor('*')", () => expect(keyCodeFor("*")).toBe(56))
	test("keyCodeFor('9')", () => expect(keyCodeFor("9")).toBe(57))
	test("keyCodeFor('(')", () => expect(keyCodeFor("(")).toBe(57))
	test("keyCodeFor('0')", () => expect(keyCodeFor("0")).toBe(48))
	test("keyCodeFor(')')", () => expect(keyCodeFor(")")).toBe(48))
	test("keyCodeFor('-')", () => expect(keyCodeFor("-")).toBe(189))
	test("keyCodeFor('_')", () => expect(keyCodeFor("_")).toBe(189))
	test("keyCodeFor('=')", () => expect(keyCodeFor("=")).toBe(187))
	test("keyCodeFor('+')", () => expect(keyCodeFor("+")).toBe(187))
	test("keyCodeFor('Backspace')", () => expect(keyCodeFor("Backspace")).toBe(8))
	test("keyCodeFor('Delete')", () => expect(keyCodeFor("Delete")).toBe(46))
})

describe("row 3", () => {
	test("keyCodeFor('Tab')", () => expect(keyCodeFor("Tab")).toBe(9))
	test("keyCodeFor('q')", () => expect(keyCodeFor("q")).toBe(81))
	test("keyCodeFor('Q')", () => expect(keyCodeFor("Q")).toBe(81))
	test("keyCodeFor('w')", () => expect(keyCodeFor("w")).toBe(87))
	test("keyCodeFor('W')", () => expect(keyCodeFor("W")).toBe(87))
	test("keyCodeFor('e')", () => expect(keyCodeFor("e")).toBe(69))
	test("keyCodeFor('E')", () => expect(keyCodeFor("E")).toBe(69))
	test("keyCodeFor('r')", () => expect(keyCodeFor("r")).toBe(82))
	test("keyCodeFor('R')", () => expect(keyCodeFor("R")).toBe(82))
	test("keyCodeFor('t')", () => expect(keyCodeFor("t")).toBe(84))
	test("keyCodeFor('T')", () => expect(keyCodeFor("T")).toBe(84))
	test("keyCodeFor('y')", () => expect(keyCodeFor("y")).toBe(89))
	test("keyCodeFor('Y')", () => expect(keyCodeFor("Y")).toBe(89))
	test("keyCodeFor('u')", () => expect(keyCodeFor("u")).toBe(85))
	test("keyCodeFor('U')", () => expect(keyCodeFor("U")).toBe(85))
	test("keyCodeFor('i')", () => expect(keyCodeFor("i")).toBe(73))
	test("keyCodeFor('I')", () => expect(keyCodeFor("I")).toBe(73))
	test("keyCodeFor('o')", () => expect(keyCodeFor("o")).toBe(79))
	test("keyCodeFor('O')", () => expect(keyCodeFor("O")).toBe(79))
	test("keyCodeFor('p')", () => expect(keyCodeFor("p")).toBe(80))
	test("keyCodeFor('P')", () => expect(keyCodeFor("P")).toBe(80))
	test("keyCodeFor('[')", () => expect(keyCodeFor("[")).toBe(219))
	test("keyCodeFor('{')", () => expect(keyCodeFor("{")).toBe(219))
	test("keyCodeFor(']')", () => expect(keyCodeFor("]")).toBe(221))
	test("keyCodeFor('}')", () => expect(keyCodeFor("}")).toBe(221))
	test("keyCodeFor('\\')", () => expect(keyCodeFor("\\")).toBe(220))
	test("keyCodeFor('|')", () => expect(keyCodeFor("|")).toBe(220))
})

describe("row 4", () => {
	test("keyCodeFor('CapsLock')", () => expect(keyCodeFor("CapsLock")).toBe(20))
	test("keyCodeFor('a')", () => expect(keyCodeFor("a")).toBe(65))
	test("keyCodeFor('A')", () => expect(keyCodeFor("A")).toBe(65))
	test("keyCodeFor('s')", () => expect(keyCodeFor("s")).toBe(83))
	test("keyCodeFor('S')", () => expect(keyCodeFor("S")).toBe(83))
	test("keyCodeFor('d')", () => expect(keyCodeFor("d")).toBe(68))
	test("keyCodeFor('D')", () => expect(keyCodeFor("D")).toBe(68))
	test("keyCodeFor('f')", () => expect(keyCodeFor("f")).toBe(70))
	test("keyCodeFor('F')", () => expect(keyCodeFor("F")).toBe(70))
	test("keyCodeFor('g')", () => expect(keyCodeFor("g")).toBe(71))
	test("keyCodeFor('G')", () => expect(keyCodeFor("G")).toBe(71))
	test("keyCodeFor('h')", () => expect(keyCodeFor("h")).toBe(72))
	test("keyCodeFor('H')", () => expect(keyCodeFor("H")).toBe(72))
	test("keyCodeFor('j')", () => expect(keyCodeFor("j")).toBe(74))
	test("keyCodeFor('J')", () => expect(keyCodeFor("J")).toBe(74))
	test("keyCodeFor('k')", () => expect(keyCodeFor("k")).toBe(75))
	test("keyCodeFor('K')", () => expect(keyCodeFor("K")).toBe(75))
	test("keyCodeFor('l')", () => expect(keyCodeFor("l")).toBe(76))
	test("keyCodeFor('L')", () => expect(keyCodeFor("L")).toBe(76))
	test("keyCodeFor(';')", () => expect(keyCodeFor(";")).toBe(186))
	test("keyCodeFor(':')", () => expect(keyCodeFor(":")).toBe(186))
	test("keyCodeFor(''')", () => expect(keyCodeFor("'")).toBe(222))
	test("keyCodeFor('\"')", () => expect(keyCodeFor("\"")).toBe(222))
	test("keyCodeFor('Enter')", () => expect(keyCodeFor("Enter")).toBe(13))
})

describe("row 5", () => {
	test("keyCodeFor('Shift')", () => expect(keyCodeFor("Shift")).toBe(16))
	test("keyCodeFor('z')", () => expect(keyCodeFor("z")).toBe(90))
	test("keyCodeFor('Z')", () => expect(keyCodeFor("Z")).toBe(90))
	test("keyCodeFor('x')", () => expect(keyCodeFor("x")).toBe(88))
	test("keyCodeFor('X')", () => expect(keyCodeFor("X")).toBe(88))
	test("keyCodeFor('c')", () => expect(keyCodeFor("c")).toBe(67))
	test("keyCodeFor('C')", () => expect(keyCodeFor("C")).toBe(67))
	test("keyCodeFor('v')", () => expect(keyCodeFor("v")).toBe(86))
	test("keyCodeFor('V')", () => expect(keyCodeFor("V")).toBe(86))
	test("keyCodeFor('b')", () => expect(keyCodeFor("b")).toBe(66))
	test("keyCodeFor('B')", () => expect(keyCodeFor("B")).toBe(66))
	test("keyCodeFor('n')", () => expect(keyCodeFor("n")).toBe(78))
	test("keyCodeFor('N')", () => expect(keyCodeFor("N")).toBe(78))
	test("keyCodeFor('m')", () => expect(keyCodeFor("m")).toBe(77))
	test("keyCodeFor('M')", () => expect(keyCodeFor("M")).toBe(77))
	test("keyCodeFor(',')", () => expect(keyCodeFor(",")).toBe(188))
	test("keyCodeFor('<')", () => expect(keyCodeFor("<")).toBe(188))
	test("keyCodeFor('.')", () => expect(keyCodeFor(".")).toBe(190))
	test("keyCodeFor('>')", () => expect(keyCodeFor(">")).toBe(190))
	test("keyCodeFor('/')", () => expect(keyCodeFor("/")).toBe(191))
	test("keyCodeFor('?')", () => expect(keyCodeFor("?")).toBe(191))
})

describe("row 6", () => {
	test("keyCodeFor('Control')", () => expect(keyCodeFor("Control")).toBe(17))
	test("keyCodeFor('Alt')", () => expect(keyCodeFor("Alt")).toBe(18))
	test("keyCodeFor('Meta')", () => expect(keyCodeFor("Meta")).toBe(91))
	test("keyCodeFor('Space')", () => expect(keyCodeFor("Space")).toBe(32))
	test("keyCodeFor('ArrowLeft')", () => expect(keyCodeFor("ArrowLeft")).toBe(37))
	test("keyCodeFor('ArrowUp')", () => expect(keyCodeFor("ArrowUp")).toBe(38))
	test("keyCodeFor('ArrowDown')", () => expect(keyCodeFor("ArrowDown")).toBe(40))
	test("keyCodeFor('ArrowRight')", () => expect(keyCodeFor("ArrowRight")).toBe(39))
})

describe("etc.", () => {
	test("keyCodeFor('') (throws)", () => expect(() => keyCodeFor("")).toThrow())
	test("keyCodeFor('foo') (throws)", () => expect(() => keyCodeFor("foo")).toThrow())
})
