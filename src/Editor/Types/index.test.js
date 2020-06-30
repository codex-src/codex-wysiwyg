import {
	enum as enumerated,
	sortOrder,
} from "./index"

test("sortOrder", () => {
	expect(sortOrder[enumerated.a] < sortOrder[enumerated.code]).toBeTruthy()
	expect(sortOrder[enumerated.code] < sortOrder[enumerated.strike]).toBeTruthy()
	expect(sortOrder[enumerated.strike] < sortOrder[enumerated.strong]).toBeTruthy()
	expect(sortOrder[enumerated.strong] < sortOrder[enumerated.em]).toBeTruthy()
})
