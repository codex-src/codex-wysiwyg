// Enumerated map. Note that enums cannot be mutated once
// constructed.
class NumberEnum {
	constructor(...enumKeys) {
		for (let x = 0; x < enumKeys.length; x++) {
			this[enumKeys[x]] = x
		}
		Object.freeze(this)
	}
}

export default NumberEnum
