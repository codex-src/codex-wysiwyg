import { default as record } from "./recordActionImpl"

const e = {
	lastActionTimestamp: Date.now(),
	lastAction: "init",
}

// https://stackoverflow.com/a/39914235
function sleep(ms) {
	new Promise(r => setTimeout(r, 2000))
}

test("record(...)", async () => {
	expect(e.lastAction).toBe("init")

	record(e)("focus")
	expect(e.lastAction).toBe("focus")
	record(e)("blur")
	expect(e.lastAction).toBe("blur")

	record(e)("select")
	expect(e.lastAction).toBe("blur") // No-op

	await sleep(1e3)
	record(e)("select")
	expect(e.lastAction).toBe("select")
})
