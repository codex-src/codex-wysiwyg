import * as PositionMethods from "./PositionMethods"
import * as RangeMethods from "./RangeMethods"
import hash from "lib/hash"
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
export class InlineElementTypeList extends Array {
	[immerable] = true
}

// Describes an inline element.
export class InlineElement {
	[immerable] = true

	types = new InlineElementTypeList()
	props = {
		children: "",
	}
}

// Describes an inline element list; colloquially referred
// to as children.
export class InlineElementList extends Array {
	[immerable] = true
}

// Describes an element.
export class Element {
	[immerable] = true

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
export class ElementList extends Array {
	[immerable] = true
}

// Describes a position.
export class Position {
	[immerable] = true

	key = ""
	offset = 0

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

	constructor({ start, end } = {}) {
		Object.assign(this, {
			start: start || new Position(),
			end: end || new Position(),
		})
	}

	// Computes whether the positions are collapsed.
	get collapsed() {
		return this.start.isEqualTo(this.end)
	}
}

/*
 * Position
 */
Position[immerable] = true

Position.fromUserLiteral = function({ node, offset }) {
	return PositionMethods.fromUserLiteral.apply(this, arguments)
}
Position.prototype.isEqualTo = function(pos) {
	return PositionMethods.isEqualTo.apply(this, arguments)
}
Position.prototype.toUserLiteral = function() {
	return PositionMethods.toUserLiteral.apply(this, arguments)
}

/*
 * Range
 */
Range[immerable] = true

Range.fromCurrent = function(tree) {
	return RangeMethods.fromCurrent.apply(this, arguments)
}
Range.prototype.collapse = function() {
	return RangeMethods.collapse.apply(this, arguments)
}
Range.prototype.toUserLiteral = function() {
	return RangeMethods.toUserLiteral.apply(this, arguments)
}
