import sorter from "./sorter"

test("[]", () => {
	const types = []
	types.sort(sorter)
	expect(types).toEqual([])
})

test("['em']", () => {
	const types = ["em"]
	types.sort(sorter)
	expect(types).toEqual(["em"])
})

test("['em', 'strong']", () => {
	const types = ["em", "strong"]
	types.sort(sorter)
	expect(types).toEqual(["strong", "em"])
})

test("['em', 'strong', 'strike']", () => {
	const types = ["em", "strong", "strike"]
	types.sort(sorter)
	expect(types).toEqual(["strike", "strong", "em"])
})

test("['em', 'strong', 'strike', 'a']", () => {
	const types = ["em", "strong", "strike", "a"]
	types.sort(sorter)
	expect(types).toEqual(["a", "strike", "strong", "em"])
})

test("['em', 'strong', 'strike', 'a', 'code']", () => {
	const types = ["em", "strong", "strike", "a", "code"]
	types.sort(sorter)
	expect(types).toEqual(["code", "a", "strike", "strong", "em"])
})
