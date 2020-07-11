import hash from "./index"

test("hash(...).length", () => {
	expect(hash(0x01).length).toBe(0x01)
	expect(hash(0x1f).length).toBe(0x1f)

	expect(() => hash(0x00).length).toThrow()
})

test("/[a-z][0-9]|[0-9][a-z]/", () => {
	for (let x = 0; x < 1e3; x++) {
		expect(hash(6).search(/[a-z][0-9]|[0-9][a-z]/) >= 0).toBeTruthy()
	}
})
