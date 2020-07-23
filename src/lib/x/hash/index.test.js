import hash from "./index"

test("hash(...)", () => {
	for (let x = 0; x < 1e3; x++) {
		expect(hash().search(/[a-z][0-9]|[0-9][a-z]/) >= 0).toBeTruthy()
	}
})
