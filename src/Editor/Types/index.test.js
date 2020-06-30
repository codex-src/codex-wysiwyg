import {
	enum as enumerated,
	sortOrder,
} from "./index"

test("sortOrder", () => {
	expect(sortOrder[enumerated.code] < sortOrder[enumerated.a]).toBeTruthy()
	expect(sortOrder[enumerated.a] < sortOrder[enumerated.strike]).toBeTruthy()
	expect(sortOrder[enumerated.strike] < sortOrder[enumerated.strong]).toBeTruthy()
	expect(sortOrder[enumerated.strong] < sortOrder[enumerated.em]).toBeTruthy()
})
