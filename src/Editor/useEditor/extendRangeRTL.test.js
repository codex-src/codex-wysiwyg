import extendRangeRTL from "./extendRangeRTL"
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
		{
			type: "p",
			key: hash(),
			props: {
				children: [],
			},
		},
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

test("boundary=rune", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[2].key,
			offset: 13,
		},
		end: {
			key: state.elements[2].key,
			offset: 13,
		},
	}
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	expect(state.range.start).toEqual({
		key: state.elements[2].key,
		offset: 0,
	})
	extendRangeRTL(state, "rune")
	expect(state.range.start).toEqual({
		key: state.elements[1].key,
		offset: 0,
	})
	extendRangeRTL(state, "rune")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 13,
	})
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	extendRangeRTL(state, "rune")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 0,
	})
})

test("boundary=word", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[2].key,
			offset: 13,
		},
		end: {
			key: state.elements[2].key,
			offset: 13,
		},
	}
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	expect(state.range.start).toEqual({
		key: state.elements[2].key,
		offset: 0,
	})
	extendRangeRTL(state, "word")
	expect(state.range.start).toEqual({
		key: state.elements[1].key,
		offset: 0,
	})
	extendRangeRTL(state, "word")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 13,
	})
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	extendRangeRTL(state, "word")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 0,
	})
})

test("boundary=line", () => {
	const state = deepCopy()
	state.range = {
		start: {
			key: state.elements[2].key,
			offset: 13,
		},
		end: {
			key: state.elements[2].key,
			offset: 13,
		},
	}
	extendRangeRTL(state, "line")
	expect(state.range.start).toEqual({
		key: state.elements[2].key,
		offset: 0,
	})
	extendRangeRTL(state, "line")
	expect(state.range.start).toEqual({
		key: state.elements[1].key,
		offset: 0,
	})
	extendRangeRTL(state, "line")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 13,
	})
	extendRangeRTL(state, "line")
	expect(state.range.start).toEqual({
		key: state.elements[0].key,
		offset: 0,
	})
})
