// Enumerated map. Note that enums cannot be mutated once
// constructed.
export class Enum {
	constructor(...enumKeys) {
		for (const each of enumKeys) {
			this[each] = each
		}
		Object.freeze(this)
	}
}

export default Enum
