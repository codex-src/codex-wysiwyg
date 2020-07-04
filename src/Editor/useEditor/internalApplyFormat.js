import * as Types from "../Types"
import iota from "lib/iota"
import queryCollection from "./queryCollection"
import { render } from "./implementation"

const i = iota(-1)

// Enumerates whether to apply a format.
const enumerated = {
	plaintext:      i(),
	shouldNotApply: i(),
	shouldApply:    i(),
}

// Tests whether to apply a format.
const testShouldApply = collection => (T, P = {}) => {
	if (T === "plaintext") {
		return enumerated.plaintext
	}
	const didApply = collection.every(each => each.spans.every(each => each.types.indexOf(T) >= 0))
	return didApply ? enumerated.shouldNotApply : enumerated.shouldApply
}

// Applies a format to the current range.
const internalApplyFormat = state => (T, P = {}) => {
	const collection = queryCollection(state)()

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

	render(state)()
}

export default internalApplyFormat
