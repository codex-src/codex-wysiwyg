import sleepFor from "lib/x/sleepFor"
import { record } from "./actions"

const e = {
	lastActionTimestamp: 0,
	lastAction: "",
}

test("record(...)", async () => {
	record(e)("init")
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
