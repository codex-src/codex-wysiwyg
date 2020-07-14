import * as PositionMethods from "./methods/Position"
import * as RangeMethods from "./methods/Range"
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
}

// Describes a WYSIWYG editor.
export class WYSIWYGEditor {
	// NOTE: DOMContentLoaded disables read-only mode.
	readOnlyModeEnabled = true
	readOnlyMarkdownModeEnabled = false
	focused = false
	elements = new ElementList()
	range = new Range()
	#renderCounter = 0

	// get shouldComponentUpdate() {
	// 	return this.#renderCounter
	// }
}

// Prototypes methods to a class. Supports __static__ and
// __get__ methods.
function Prototype(Class, methods) {
	Class[immerable] = true
	for (const each of Object.keys(methods)) {
		if (each.startsWith("__static__")) {
			Class[each.slice("__static__".length)] = methods[each]
			continue
		} else if (each.startsWith("__get__")) {
			Object.defineProperty(Class.prototype, each.slice("__get__".length), {
				get: methods[each],
			})
			continue
		}
		Class.prototype[each] = methods[each]
	}
}

;(() => {
	Prototype(Position, PositionMethods)
	Prototype(Range, RangeMethods)
})()
