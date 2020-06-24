import newShortUUID from "./index"

test("newShortUUID", () => {
	expect(newShortUUID().length).toBe(8)
	const chars = "0123456789abcdef"
	for (const char of newShortUUID()) {
		expect(chars.indexOf(char) >= 0).toBe(true)
	}
	expect(newShortUUID()).not.toBe(newShortUUID())
})
