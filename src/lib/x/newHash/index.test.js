import newHash from "./index"

test("/[a-z][0-9]|[0-9][a-z]/", () => {
	for (let x = 0; x < 1e3; x++) {
		expect(newHash().search(/[a-z][0-9]|[0-9][a-z]/) >= 0).toBeTruthy()
	}
})
