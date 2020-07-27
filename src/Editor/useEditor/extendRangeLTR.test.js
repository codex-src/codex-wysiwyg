import extendRangeLTR from "./extendRangeLTR"
import hash from "lib/x/hash"
import innerText from "../utils/innerText"
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
			key: state.elements[0].key,
			offset: 0,
		},
		end: {
			key: state.elements[0].key,
			offset: 0,
		},
	}
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	expect(state.range.end).toEqual({
		key: state.elements[0].key,
		offset: 13,
	})
	extendRangeLTR(state, "rune")
	expect(state.range.end).toEqual({
		key: state.elements[1].key,
		offset: 0,
	})
	extendRangeLTR(state, "rune")
	expect(state.range.end).toEqual({
		key: state.elements[2].key,
		offset: 0,
	})
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	extendRangeLTR(state, "rune")
	expect(state.range.end).toEqual({
		key: state.elements[2].key,
		offset: 13,
	})
})

test("boundary=word", () => {
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
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	expect(state.range.end).toEqual({
		key: state.elements[0].key,
		offset: 13,
	})
	extendRangeLTR(state, "word")
	expect(state.range.end).toEqual({
		key: state.elements[1].key,
		offset: 0,
	})
	extendRangeLTR(state, "word")
	expect(state.range.end).toEqual({
		key: state.elements[2].key,
		offset: 0,
	})
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	extendRangeLTR(state, "word")
	expect(state.range.end).toEqual({
		key: state.elements[2].key,
		offset: 13,
	})
})
