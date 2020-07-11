import JSONClone from "./JSONClone"

const ref = Object.freeze({
	value: "Hello, world!",
	ref: {
		value: "Hello, world!",
	},
})

test("toBe(...)", () => {
	expect(ref).toBe(ref)
	expect(ref.value).toBe(ref.value)
	expect(ref.ref).toBe(ref.ref)
	expect(ref.ref.value).toBe(ref.ref.value)

	expect(JSONClone(ref)).not.toBe(ref)
	expect(JSONClone(ref.value)).toBe(ref.value)
	expect(JSONClone(ref.ref)).not.toBe(ref.ref)
	expect(JSONClone(ref.ref.value)).toBe(ref.ref.value)
})

test("toEqual(...)", () => {
	expect(JSONClone(ref)).toEqual(JSONClone(ref))
	expect(JSONClone(ref.value)).toEqual(JSONClone(ref.value))
	expect(JSONClone(ref.ref)).toEqual(JSONClone(ref.ref))
	expect(JSONClone(ref.ref).value).toEqual(JSONClone(ref.ref.value))
})
