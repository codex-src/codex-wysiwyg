import hash from "./index"

test("/[a-z][0-9]|[0-9][a-z]/", () => {
	for (let x = 0; x < 1e3; x++) {
		expect(hash(6).search(/[a-z][0-9]|[0-9][a-z]/) >= 0).toBeTruthy()
	}
})
