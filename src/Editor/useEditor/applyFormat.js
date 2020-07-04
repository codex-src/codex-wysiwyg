import * as Types from "../Types"

// Collection function; test whether to apply formatting.
//
// -1: Plaintext
//  0: Should not apply
//  1: Should apply
//
const testShouldApply = collection => (T, P = {}) => {
	if (T === "plaintext") {
		return -1
	}
	const applied = collection.every(each => each.spans.every(each => each.types.indexOf(T) >= 0))
	return applied ? 0 : 1
}

// Collection function; applies a format to a collection.
const applyFormat = collection => (T, P = {}) => {
	// Tests whether to apply formatting:
	const shouldApply = testShouldApply(collection)(T, P)

	// Plaintext:
	if (shouldApply === -1) {
		for (const c of collection) {
			for (const s of c.spans) {
				for (const T of s.types) {
					s[T] = undefined
				}
				s.types.splice(0)
			}
			c.spans.map(each => Types.sort(each))
		}
	// Should not apply:
	} else if (shouldApply === 0) {
		for (const c of collection) {
			for (const s of c.spans) {
				const x = s.types.indexOf(T)
				if (x >= 0) {
					s.types.splice(x, 1)
					s[T] = undefined
				}
			}
			c.spans.map(each => Types.sort(each))
		}
	// Should apply:
	} else if (shouldApply === 1) {
		for (const c of collection) {
			for (const s of c.spans) {
				const x = s.types.indexOf(T)
				if (x === -1) {
					s.types.push(T)
					if (Object.keys(P).length) {
						s[T] = P
					}
				}
			}
			c.spans.map(each => Types.sort(each))
		}
	}
}

export default applyFormat
