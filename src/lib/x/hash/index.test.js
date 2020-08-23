import hash from "./index"

test("hash(...)", () => {
	expect(hash().length).toBe(6)
	for (let len = 1; len <= 32; len++) {
		const id = hash(len)
		if (len >= 6) {
			expect(id.search(/[a-z][0-9]|[0-9][a-z]/) >= 0).toBeTruthy()
		}
		expect(id.length).toBe(len)
	}
})
