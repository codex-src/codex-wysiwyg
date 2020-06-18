import toArray from "./toArray"

test("toArray", () => {
	expect(toArray(undefined)).toEqual([undefined])
	expect(toArray(null)).toEqual([null])
	expect(toArray(1)).toEqual([1])
	expect(toArray([1])).toEqual([1])
	expect(toArray([[1]])).toEqual([[1]])
})
