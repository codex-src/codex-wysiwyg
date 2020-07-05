import * as Types from "../Types"
import methods from "./methods"
import queryCollection from "./queryCollection"

// Tests whether to apply a format.
const testShouldApply = collection => (T, P = {}) => {
	if (T === "plaintext") {
		return "plaintext"
	}
	const didApply = collection.every(each => each.refs.spans.every(each => each.types.indexOf(T) >= 0))
	return didApply ? "should-not-apply" : "should-apply"
}

// Applies a format to the current range.
const applyFormat = state => (T, P = {}) => {
	const collection = queryCollection(state)

	const shouldApply = testShouldApply(collection)(T, P)
	switch (shouldApply) {
	// Plaintext:
	case "plaintext":
		for (const c of collection) {
			for (const s of c.refs.spans) {
				for (const T of s.types) {
					s[T] = undefined
				}
				s.types.splice(0)
			}
			c.refs.spans.map(each => Types.sort(each))
		}
		break
	// Should not apply a format:
	case "should-not-apply":
		for (const c of collection) {
			for (const s of c.refs.spans) {
				const x = s.types.indexOf(T)
				if (x >= 0) {
					s.types.splice(x, 1)
					s[T] = undefined
				}
			}
			c.refs.spans.map(each => Types.sort(each))
		}
		break
	// Should apply a format:
	case "should-apply":
		for (const c of collection) {
			for (const s of c.refs.spans) {
				const x = s.types.indexOf(T)
				if (x === -1) {
					s.types.push(T)
					if (Object.keys(P).length) {
						s[T] = P
					}
				}
			}
			c.refs.spans.map(each => Types.sort(each))
		}
		break
	default:
		// No-op
		break
	}

	// Done -- render:
	methods(state).render()
}

export default applyFormat
