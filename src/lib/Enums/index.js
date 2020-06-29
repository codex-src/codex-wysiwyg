// Maps strings to string properties. Note that enums cannot
// be mutated once constructed.
export class Enum {
	constructor(...enumKeys) {
		for (const each of enumKeys) {
			this[each] = each
		}
		Object.freeze(this)
	}
}

// Maps strings to zero-based number properties. Note that
// enums cannot be mutated once constructed.
export class NumberEnum {
	constructor(...enumKeys) {
		for (const [x, each] of enumKeys.entries()) {
			this[each] = x
		}
		Object.freeze(this)
	}
}
