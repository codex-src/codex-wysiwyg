import sorter from "./sorter"

test("[]", () => {
	const types = []
	types.sort(sorter)
	expect(types).toEqual([])
})

test("['em']", () => {
	const types = [
		{ type: "em", props: null },
	]
	types.sort(sorter)
	expect(types[0].type).toBe("em")
})

test("['em', 'strong']", () => {
	const types = [
		{ type: "em", props: null },
		{ type: "strong", props: null },
	]
	types.sort(sorter)
	expect(types[0].type).toBe("strong")
	expect(types[1].type).toBe("em")
})

test("['em', 'strong', 'strike']", () => {
	const types = [
		{ type: "em", props: null },
		{ type: "strong", props: null },
		{ type: "strike", props: null },
	]
	types.sort(sorter)
	expect(types[0].type).toBe("strike")
	expect(types[1].type).toBe("strong")
	expect(types[2].type).toBe("em")
})

test("['em', 'strong', 'strike', 'a']", () => {
	const types = [
		{ type: "em", props: null },
		{ type: "strong", props: null },
		{ type: "strike", props: null },
		{ type: "a", props: null },
	]
	types.sort(sorter)
	expect(types[0].type).toBe("a")
	expect(types[1].type).toBe("strike")
	expect(types[2].type).toBe("strong")
	expect(types[3].type).toBe("em")
})

test("['em', 'strong', 'strike', 'a', 'code']", () => {
	const types = [
		{ type: "em", props: null },
		{ type: "strong", props: null },
		{ type: "strike", props: null },
		{ type: "a", props: null },
		{ type: "code", props: null },
	]
	types.sort(sorter)
	expect(types[0].type).toBe("code")
	expect(types[1].type).toBe("a")
	expect(types[2].type).toBe("strike")
	expect(types[3].type).toBe("strong")
	expect(types[4].type).toBe("em")
})
