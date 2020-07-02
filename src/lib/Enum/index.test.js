import Enum from "./index"

test("Enum", () => {
	const daysOfTheWeekEnum = new Enum(
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	)
	expect(daysOfTheWeekEnum.Monday).toBe("Monday")
	expect(daysOfTheWeekEnum.Tuesday).toBe("Tuesday")
	expect(daysOfTheWeekEnum.Wednesday).toBe("Wednesday")
	expect(daysOfTheWeekEnum.Thursday).toBe("Thursday")
	expect(daysOfTheWeekEnum.Friday).toBe("Friday")
	expect(daysOfTheWeekEnum.Saturday).toBe("Saturday")
	expect(daysOfTheWeekEnum.Saturday).toBe("Saturday")

	// TypeError: Cannot assign to read only property 'Wednesday' of object '#<Enum>'
	expect(() => daysOfTheWeekEnum.Wednesday = "Humpday").toThrow()
})
