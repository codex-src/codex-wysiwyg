import collapsed from "./index"
import hash from "lib/x/hash"

test("collapsed(...); 1 of 4", () => {
	const pos = {
		key: "",
		offset: 0,
	}
	const range = {
		start: pos,
		end: pos,
	}
	expect(collapsed(range)).toBeTruthy()
})

test("collapsed(...); 2 of 4", () => {
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
	expect(collapsed(range)).toBeTruthy()
})

test("collapsed(...); 3 of 4", () => {
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
	expect(collapsed(range)).not.toBeTruthy()
})

test("collapsed(...); 4 of 4", () => {
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
	expect(collapsed(range)).not.toBeTruthy()
})
