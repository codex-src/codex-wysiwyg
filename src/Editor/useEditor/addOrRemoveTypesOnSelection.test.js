import addOrRemoveTypesOnSelection from "./addOrRemoveTypesOnSelection"
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
	addOrRemoveTypesOnSelection(state, { code: {} })
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
	addOrRemoveTypesOnSelection(state, { code: {} })
	expect(state.elements[0].props.children).toEqual([
		{ types: { code: {} }, props: { children: "Hello, world" } },
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
	addOrRemoveTypesOnSelection(state, { code: {} })
	expect(state.elements[0].props.children).toEqual([
		{ types: {}, props: { children: "Hello, world!" } },
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
	addOrRemoveTypesOnSelection(state, { code: {} })
	expect(state.elements[0].props.children).toEqual([
		{ types: {}, props: { children: "Hello, " } },
		{ types: { code: {} }, props: { children: "world!" } },
	])
})

test("[Hello, <code>world</code>!]", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 13,
		},
	}
	addOrRemoveTypesOnSelection(state, { code: {} })
	expect(state.elements[0].props.children).toEqual([
		{ types: { code: {} }, props: { children: "Hello, world!" } },
	])
})

test("[Hello, <code>world</code>!]; plaintext", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 13,
		},
	}
	addOrRemoveTypesOnSelection(state, {})
	expect(state.elements[0].props.children).toEqual([
		{ types: {}, props: { children: "Hello, world!" } },
	])
})
