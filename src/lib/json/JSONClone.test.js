import JSONClone from "./JSONClone"

const value = "Hello, world!"

const ref = Object.freeze({
	value,
	reference: { value },
})

test("toBe", () => {
	expect(ref).toBe(ref)
	expect(ref.value).toBe(ref.value)
	expect(ref.reference).toBe(ref.reference)
	expect(ref.reference.value).toBe(ref.reference.value)

	expect(JSONClone(ref)).not.toBe(ref)
	expect(JSONClone(ref.value)).toBe(ref.value)
	expect(JSONClone(ref.reference)).not.toBe(ref.reference)
	expect(JSONClone(ref.reference.value)).toBe(ref.reference.value)
})

test("toEqual", () => {
	expect(JSONClone(ref)).toEqual(JSONClone(ref))
	expect(JSONClone(ref.value)).toEqual(JSONClone(ref.value))
	expect(JSONClone(ref.reference)).toEqual(JSONClone(ref.reference))
	expect(JSONClone(ref.reference).value).toEqual(JSONClone(ref.reference.value))
})
