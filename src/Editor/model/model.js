import * as PositionImpl from "./implementation/Position"
import * as RangeImpl from "./implementation/Range"
import hash from "lib/hash"
import JSONEqual from "lib/json/JSONEqual"
import { immerable } from "immer"

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

/*
 * Position
 */

// Describes a position.
export class Position {
	key = ""
	offset = 0

	constructor({ key, offset } = {}) {
		Object.assign(this, {
			key: key || "",
			offset: offset || 0,
		})
	}
}

Position[immerable] = true

Position.fromUserLiteral = function() {
	return PositionImpl.fromUserLiteral.apply(this, arguments)
}
Position.toUserLiteral = function() {
	return PositionImpl.toUserLiteral.apply(this, arguments)
}

/*
 * Range
 */

// Describes a range.
export class Range {
	start = new Position()
	end = new Position()

	constructor({ start, end } = {}) {
		Object.assign(this, {
			start: start || new Position(),
			end: end || new Position(),
		})
	}

	get collapsed() {
		return JSONEqual(this.start, this.end)
	}
}

Range[immerable] = true

Range.fromCurrent = function() {
	return RangeImpl.fromCurrent.apply(this, arguments)
}
Range.prototype.collapse = function() {
	return RangeImpl.collapse.apply(this, arguments)
}
Range.prototype.toUserLiteral = function() {
	return RangeImpl.toUserLiteral.apply(this, arguments)
}
