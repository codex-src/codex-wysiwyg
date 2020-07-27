import deleteImpl from "./deleteImpl"
import hash from "lib/x/hash"
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
	deleteImpl(state)
	expect(state.elements[0].props.children).toEqual([])
})

test("[Hello, ]<code>world</code>!", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 7,
		},
	}
	deleteImpl(state)
	expect(state.elements[0].props.children).toEqual([
		{ types: { code: {} }, props: { children: "world" } },
		{ types: {}, props: { children: "!" } },
	])
})

test("Hello, [<code>world</code>]!", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 7,
		},
		end: {
			key: state.elements[0].key,
			offset: 12,
		},
	}
	deleteImpl(state)
	expect(state.elements[0].props.children).toEqual([
		{ types: {}, props: { children: "Hello, !" } },
	])
})

test("Hello, <code>world</code>[!]", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 12,
		},
		end: {
			key: state.elements[0].key,
			offset: 13,
		},
	}
	deleteImpl(state)
	expect(state.elements[0].props.children).toEqual([
		{ types: {}, props: { children: "Hello, " } },
		{ types: { code: {} }, props: { children: "world" } },
	])
})
