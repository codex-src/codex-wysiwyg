// Throws on non-truthy values. For numbers, throws on -1.
function assert(value) {
	if ((value && typeof value !== "number") || (typeof value === "number" && value !== -1)) {
		// No-op
		return
	}
	throw new Error(`assert: value assertion; value=${value}`)
}

export default assert
