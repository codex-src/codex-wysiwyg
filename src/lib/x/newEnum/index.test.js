import newEnum from "./index"

const dotwEnum = newEnum(
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
)

test("newEnum(...)", () => {
	expect(dotwEnum.Monday).toBe("Monday")
	expect(dotwEnum.Tuesday).toBe("Tuesday")
	expect(dotwEnum.Wednesday).toBe("Wednesday")
	expect(dotwEnum.Thursday).toBe("Thursday")
	expect(dotwEnum.Friday).toBe("Friday")
	expect(dotwEnum.Saturday).toBe("Saturday")
	expect(dotwEnum.Saturday).toBe("Saturday")

	expect(() => dotwEnum.Wednesday = "Humpday").toThrow()
})
