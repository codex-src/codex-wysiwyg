import toArray from "./toArray"

test("undefined", () => expect(toArray(undefined)).toEqual([undefined]))
test("null", () => expect(toArray(null)).toEqual([null]))
test("0", () => expect(toArray(0)).toEqual([0]))
test("[0]", () => expect(toArray([0])).toEqual([0]))
test("[[0]]", () => expect(toArray([[0]])).toEqual([[0]]))
