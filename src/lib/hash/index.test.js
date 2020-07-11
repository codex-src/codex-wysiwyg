import hash from "./index"

test("hash(...).length", () => {
	expect(hash(0x01).length).toBe(0x01)
	expect(hash(0x1f).length).toBe(0x1f)

	expect(() => hash(0x00).length).toThrow()
})
