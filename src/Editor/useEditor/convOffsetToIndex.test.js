import convOffsetToIndex from "./convOffsetToIndex"

const children = [
	{
		types: {},
		props: {
			children: "Hello, ",
		},
	},
	{
		types: {
			code: {},
		},
		props: {
			children: "world",
		},
	},
	{
		types: {},
		props: {
			children: "!",
		},
	},
]

test("convOffsetToIndex(...)", () => {
	expect(convOffsetToIndex([], 0)).toBe(-1)
	expect(convOffsetToIndex(children, 0)).toBe(0)
	expect(convOffsetToIndex(children, 1)).toBe(0)
	expect(convOffsetToIndex(children, 2)).toBe(0)
	expect(convOffsetToIndex(children, 3)).toBe(0)
	expect(convOffsetToIndex(children, 4)).toBe(0)
	expect(convOffsetToIndex(children, 5)).toBe(0)
	expect(convOffsetToIndex(children, 6)).toBe(0)
	expect(convOffsetToIndex(children, 7)).toBe(0)
	expect(convOffsetToIndex(children, 8)).toBe(1)
	expect(convOffsetToIndex(children, 9)).toBe(1)
	expect(convOffsetToIndex(children, 10)).toBe(1)
	expect(convOffsetToIndex(children, 11)).toBe(1)
	expect(convOffsetToIndex(children, 12)).toBe(1)
	expect(convOffsetToIndex(children, 13)).toBe(2)
})
