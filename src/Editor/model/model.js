// Describes <em>.
export class Emphasis {
	type = "em"
	attrs = null
}

// Describes <strong>.
export class Strong {
	type = "strong"
	attrs = null
}

// Describes <code>.
export class Code {
	type = "code"
	attrs = null
}

// Describes <strike>.
export class Strikethrough {
	type = "code"
	attrs = null
}

// Describes <a href="...">.
export class Anchor {
	type = "a"
	attrs = {
		href: "",
	}

	// Constructs a new anchor.
	constructor(href) {
		Object.assign(this, {
			href: href || "",
		})
	}
}

// Describes an inline element type list.
export class InlineElementTypeList extends Array {}

// Describes an inline element.
export class InlineElement {
	types = new InlineElementTypeList()
	props = {
		children: "",
	}
}

// Describes an inline element list; colloquially referred
// to as children.
export class InlineElementList extends Array {}

// Describes an element.
export class Element {
	type = ""
	key = hash()
	props = {
		children: new InlineElementList(),
	}

	// Constructs a new element.
	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "",
			key: key || hash(),
			props: props || {
				children: new InlineElementList(),
			},
		})
	}
}

// Describes an element list.
export class ElementList extends Array {}

// Describes a position.
export class Position {
	key = ""
	offset = 0

	// Constructs a new position.
	constructor({ key, offset } = {}) {
		Object.assign(this, {
			key: key || "",
			offset: offset || 0,
		})
	}
}

// Describes a range.
export class Range {
	start = new Position()
	end = new Position()

	// Constructs a new range.
	constructor({ start, end } = {}) {
		Object.assign(this, {
			start: start || new Position(),
			end: end || new Position(),
		})
	}
}
