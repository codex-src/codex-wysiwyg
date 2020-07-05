import NumberEnum from "./NumberEnum"

test("", () => {
	const daysOfTheWeekEnum = new NumberEnum(
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	)
	expect(daysOfTheWeekEnum.Monday).toBe(0)
	expect(daysOfTheWeekEnum.Tuesday).toBe(1)
	expect(daysOfTheWeekEnum.Wednesday).toBe(2)
	expect(daysOfTheWeekEnum.Thursday).toBe(3)
	expect(daysOfTheWeekEnum.Friday).toBe(4)
	expect(daysOfTheWeekEnum.Saturday).toBe(5)
	expect(daysOfTheWeekEnum.Sunday).toBe(6)

	// TypeError: Cannot assign to read only property 'Wednesday' of object '#<NumberEnum>'
	expect(() => daysOfTheWeekEnum.Wednesday = "Humpday").toThrow()
})