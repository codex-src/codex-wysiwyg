import * as Types from "../Types"
import iota from "lib/iota"

const i = iota(-1)

const enumerated = {
	plaintext:      i(),
	shouldNotApply: i(),
	shouldApply:    i(),
}

// Tests whether formatting should be applied.
const testShouldApply = collection => (T, P = {}) => {
	if (T === "plaintext") {
		return enumerated.plaintext
	}
	const didApply = collection.every(each => each.spans.every(each => each.types.indexOf(T) >= 0))
	return didApply ? enumerated.shouldNotApply : enumerated.shouldApply
}

// Applies a format to a collection.
const applyFormat = collection => (T, P = {}) => {
	const shouldApply = testShouldApply(collection)(T, P)
	switch (shouldApply) {
	// Plaintext:
	case enumerated.plaintext:
		for (const c of collection) {
			for (const s of c.spans) {
				for (const T of s.types) {
					s[T] = undefined
				}
				s.types.splice(0)
			}
			c.spans.map(each => Types.sort(each))
		}
		break
	// Should not apply:
	case enumerated.shouldNotApply:
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
		break
	// Should apply:
	case enumerated.shouldApply:
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
		break
	default:
		// No-op
		break
	}
}

export default applyFormat
