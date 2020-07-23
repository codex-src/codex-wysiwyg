import sleepFor from "lib/x/sleepFor"
import { default as record } from "./recordActionImpl"

const e = {
	lastActionTimestamp: Date.now(),
	lastAction: "init",
}

test("record(...)", async () => {
	expect(e.lastAction).toBe("init")

	record(e)("focus")
	expect(e.lastAction).toBe("focus")

	record(e)("blur")
	expect(e.lastAction).toBe("blur")

	record(e)("select")
	expect(e.lastAction).toBe("blur") // No-op

	await sleepFor(1e3)
	record(e)("select")
	expect(e.lastAction).toBe("select")
})
