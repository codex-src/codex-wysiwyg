import userAgent from "./index"

import {
	mockMacOS,
	mockNonMacOS,
} from "lib/Client/mockUserAgent"

test("MacOSX=false", () => {
	mockNonMacOS()
	expect(userAgent.MacOSX).not.toBeTruthy()
})

test("MacOSX=true", () => {
	mockMacOS()
	expect(userAgent.MacOSX).toBeTruthy()
})
