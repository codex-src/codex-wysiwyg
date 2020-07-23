import ctrlOrCmd from "./index"
import userAgent from "lib/Client/userAgent"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

test("ctrlOrCmd=ctrl", () => {
	mockNonMacOS()
	expect(ctrlOrCmd).toBe("ctrl")
})

test("ctrlOrCmd=cmd", () => {
	mockMacOS()
	const $ctrlOrCmd = !userAgent.MacOSX ? "ctrl" : "cmd"
	expect($ctrlOrCmd).toBe("cmd")
})
