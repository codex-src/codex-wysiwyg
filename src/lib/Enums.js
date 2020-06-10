// Maps strings to string properties.
export class StringEnum {
	constructor(...keys) {
		for (const key of keys) {
			this[key] = key
		}
		Object.freeze(this)
	}
}

// Maps strings to number properties (zero-based).
export class NumberEnum {
	constructor(...keys) {
		for (let x = 0; x < keys.length; x++) {
			this[keys[x]] = x
		}
		Object.freeze(this)
	}
}
