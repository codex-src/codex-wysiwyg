const P = "P"

// Generates a new 6-character hash.
function hash() {
	return Math.random().toString(16).slice(2, 8)
}

class AbstractElement {
	type = ""
	key = hash()
	props = {
		children: new InlineElements(),
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "",
			key: key || hash(),
			props: props || {
				children: new InlineElements(),
			},
		})
	}
}

class Paragraph extends AbstractElement {
	type = P
}

new Paragraph()

class MultilineElement {
	type = ""
	key = hash()
	props = {
		// ...
		children: new Elements(),
	}
}

class Elements extends Array {
	// ...
}
