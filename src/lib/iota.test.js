import iota from "./iota"

test("iota", () => {
	const i = iota()
	expect(i()).toBe(0)
	expect(i()).toBe(1)
	expect(i()).toBe(2)
	expect(i()).toBe(3)
	expect(i()).toBe(4)
	expect(i()).toBe(5)
	expect(i()).toBe(6)
	expect(i()).toBe(7)
	expect(i()).toBe(8)
	expect(i()).toBe(9)
	expect(i()).toBe(10)
})