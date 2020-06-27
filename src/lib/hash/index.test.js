import hash from "./index"

test("len", () => {
	for (let len = 1; len < 32; len++) {
		expect(hash(len).length).toBe(len)
	}
	expect(hash().length).toBe(32)
})

test("hex", () => {
	const hex = "0123456789abcdef"
	for (const char of hash()) {
		expect(hex.indexOf(char) >= 0).toBeTruthy()
	}
})

test("seen[id]", () => {
	const seen = {}
	for (let x = 0; x < 1e3; x++) {
		const id = hash()
		expect(seen[id]).toBe(undefined)
		seen[id] = true
	}
})
