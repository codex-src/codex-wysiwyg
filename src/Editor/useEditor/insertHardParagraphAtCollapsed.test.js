import hash from "lib/x/hash"
import insertHardParagraphAtCollapsed from "./insertHardParagraphAtCollapsed"
import JSONClone from "lib/JSON/JSONClone"

const initialState = {
	elements: [
		{
			type: "p",
			key: hash(),
			props: {
				children: [
					{ types: {}, props: { children: "Hello, " } },
					{ types: { code: {} }, props: { children: "world" } },
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	],
	range: {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
	},
}

function deepCopy() {
	return JSONClone(initialState)
}

test("(empty)", () => {
	const state = deepCopy()
	state.elements[0].props.children = []
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 0,
		},
	}
	insertHardParagraphAtCollapsed(state)
	expect(state.elements).toEqual([
		{
			type: "p",
			key: state.elements[0].key,
			props: {
				children: [],
			},
		},
		{
			type: "p",
			key: state.elements[1].key,
			props: {
				children: [],
			},
		},
	])
})

test("[]Hello, <code>world</code>!", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 0,
		},
	}
	insertHardParagraphAtCollapsed(state)
	expect(state.elements).toEqual([
		{
			type: "p",
			key: state.elements[0].key,
			props: {
				children: [],
			},
		},
		{
			type: "p",
			key: state.elements[1].key,
			props: {
				children: [
					{ types: {}, props: { children: "Hello, " } },
					{ types: { code: {} }, props: { children: "world" } },
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	])
})

test("Hello, []<code>world</code>!", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 7,
		},
		end: {
			key: state.elements[0].key,
			offset: 7,
		},
	}
	insertHardParagraphAtCollapsed(state)
	expect(state.elements).toEqual([
		{
			type: "p",
			key: state.elements[0].key,
			props: {
				children: [
					{ types: {}, props: { children: "Hello, " } },
				],
			},
		},
		{
			type: "p",
			key: state.elements[1].key,
			props: {
				children: [
					{ types: { code: {} }, props: { children: "world" } },
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	])
})

test("Hello, <code>world[]</code>!", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 12,
		},
		end: {
			key: state.elements[0].key,
			offset: 12,
		},
	}
	insertHardParagraphAtCollapsed(state)
	expect(state.elements).toEqual([
		{
			type: "p",
			key: state.elements[0].key,
			props: {
				children: [
					{ types: {}, props: { children: "Hello, " } },
					{ types: { code: {} }, props: { children: "world" } },
				],
			},
		},
		{
			type: "p",
			key: state.elements[1].key,
			props: {
				children: [
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	])
})

test("Hello, <code>world</code>![]", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 13,
		},
		end: {
			key: state.elements[0].key,
			offset: 13,
		},
	}
	insertHardParagraphAtCollapsed(state)
	expect(state.elements).toEqual([
		{
			type: "p",
			key: state.elements[0].key,
			props: {
				children: [
					{ types: {}, props: { children: "Hello, " } },
					{ types: { code: {} }, props: { children: "world" } },
					{ types: {}, props: { children: "!" } },
				],
			},
		},
		{
			type: "p",
			key: state.elements[1].key,
			props: {
				children: [],
			},
		},
	])
})
