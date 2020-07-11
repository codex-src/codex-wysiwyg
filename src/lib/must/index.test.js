import must from "./index"

test("undefined", () => expect(() => must(undefined)).toThrow())
test("false", () => expect(() => must(false)).toThrow())
test("true", () => expect(() => must(true)).not.toThrow())
test("-1", () => expect(() => must(-1)).toThrow())
test("0", () => expect(() => must(0)).not.toThrow())
test("1", () => expect(() => must(1)).not.toThrow())
test("''", () => expect(() => must("")).toThrow())
test("'Hello, world!'", () => expect(() => must("Hello, world!")).not.toThrow())
test("null", () => expect(() => must(null)).toThrow())
test("[]", () => expect(() => must([])).not.toThrow())
test("{}", () => expect(() => must({})).not.toThrow())
test("() => {}", () => expect(() => must(() => {})).not.toThrow())
