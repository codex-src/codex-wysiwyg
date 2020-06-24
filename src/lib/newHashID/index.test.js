import newHashID from "./index"

test("nchars", () => {
	for (let nchars = 1; nchars < 32; nchars++) {
		expect(newHashID(nchars).length).toBe(nchars)
	}
	expect(newHashID().length).toBe(32)
})

test("hex", () => {
	const hex = "0123456789abcdef"
	for (const char of newHashID()) {
		expect(hex.indexOf(char) >= 0).toBe(true)
	}
})

test("seen[hash]", () => {
	const seen = {}
	for (let x = 0; x < 1e3; x++) {
		const hash = newHashID()
		expect(seen[hash]).toBe(undefined)
		seen[hash] = true
	}
})
