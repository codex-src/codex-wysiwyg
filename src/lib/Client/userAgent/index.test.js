import userAgent from "./index"

import { // Unsorted
	mockNonMacOS,
	mockMacOS,
} from "lib/Client/mockUserAgent"

test("isAAPL=false", () => {
	mockNonMacOS()
	expect(userAgent.isAAPL).not.toBeTruthy()
})

test("isAAPL=true", () => {
	mockMacOS()
	expect(userAgent.isAAPL).toBeTruthy()
})
