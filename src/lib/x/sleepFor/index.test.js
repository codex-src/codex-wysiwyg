import sleepFor from "./index"

const extraMs = 25

test("sleepFor(1e1)", async () => {
	const epoch = Date.now()
	await sleepFor(1e1)
	expect(Date.now() - epoch > 1e1 && Date.now() - epoch < 1e1 + extraMs).toBeTruthy()
})

test("sleepFor(1e2)", async () => {
	const epoch = Date.now()
	await sleepFor(1e2)
	expect(Date.now() - epoch > 1e2 && Date.now() - epoch < 1e2 + extraMs).toBeTruthy()
})

test("sleepFor(1e3)", async () => {
	const epoch = Date.now()
	await sleepFor(1e3)
	expect(Date.now() - epoch > 1e3 && Date.now() - epoch < 1e3 + extraMs).toBeTruthy()
})
