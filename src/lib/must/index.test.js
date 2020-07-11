import must from "./index"

test("must(undefined) (throws)", () => expect(() => must(undefined)).toThrow())
test("must(false) (throws)", () => expect(() => must(false)).toThrow())
test("must(true)", () => expect(() => must(true)).not.toThrow())
test("must(-1) (throws)", () => expect(() => must(-1)).toThrow())
test("must(0)", () => expect(() => must(0)).not.toThrow())
test("must(1)", () => expect(() => must(1)).not.toThrow())
test("must('') (throws)", () => expect(() => must("")).toThrow())
test("must('Hello, world!')", () => expect(() => must("Hello, world!")).not.toThrow())
test("must(null) (throws)", () => expect(() => must(null)).toThrow())
test("must([])", () => expect(() => must([])).not.toThrow())
test("must({})", () => expect(() => must({})).not.toThrow())
test("must(() => {})", () => expect(() => must(() => {})).not.toThrow())
