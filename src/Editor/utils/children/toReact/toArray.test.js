import toArray from "./toArray"

test("toArray(undefined)", () => expect(toArray(undefined)).toEqual([undefined]))
test("toArray(null)", () => expect(toArray(null)).toEqual([null]))
test("toArray(0)", () => expect(toArray(0)).toEqual([0]))
test("toArray([0])", () => expect(toArray([0])).toEqual([0]))
test("toArray([[0]])", () => expect(toArray([[0]])).toEqual([[0]]))
