import userAgent from "./index"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

test("MacOSX=false", () => {
	mockNonMacOS()
	expect(userAgent.MacOSX).not.toBeTruthy()
})

test("MacOSX=true", () => {
	mockMacOS()
	expect(userAgent.MacOSX).toBeTruthy()
})
