import hash from "lib/x/hash"
import { rangeIsCollapsed } from "./Range"

test("rangeIsCollapsed(...); 1 of 4", () => {
	const pos = {
		key: "",
		offset: 0,
	}
	const range = {
		start: pos,
		end: pos,
	}
	expect(rangeIsCollapsed(range)).toBeTruthy()
})

test("rangeIsCollapsed(...); 2 of 4", () => {
	const range = {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
	}
	expect(rangeIsCollapsed(range)).toBeTruthy()
})

test("rangeIsCollapsed(...); 3 of 4", () => {
	const range = {
		start: {
			key: hash(),
			offset: 0,
		},
		end: {
			key: hash(),
			offset: 0,
		},
	}
	expect(rangeIsCollapsed(range)).not.toBeTruthy()
})

test("rangeIsCollapsed(...); 4 of 4", () => {
	const id = hash()
	const range = {
		start: {
			key: id,
			offset: 0,
		},
		end: {
			key: id,
			offset: 10,
		},
	}
	expect(rangeIsCollapsed(range)).not.toBeTruthy()
})
