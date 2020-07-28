import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getShorthandVars from "./getShorthandVars"
import JSONEqual from "lib/JSON/JSONEqual"

// Aggregates children.
function aggregate(elements, range) {
	const ch = []
	for (const each of elements) {
		if (!each.props.children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (each.key === range.start.key) {
			x1 = createIndexAtOffset(each.props.children, range.start.offset)
		}
		let x2 = each.props.children.length
		if (each.key === range.end.key) {
			x2 = createIndexAtOffset(each.props.children, range.end.offset)
		}
		ch.push(...each.props.children.slice(x1, x2))
	}
	return ch
}

// Tests for a method: "plaintext", "add", or "remove".
function testMethod(children, types) {
	const keys = Object.keys(types)
	if (!keys.length) {
		return "plaintext"
	}
	const every = children.every(each => {
		for (const key of keys) {
			// Test for the presence of a type and that
			// each.types[type] and types[key] are deeply equal:
			if (!each.types[key] || !JSONEqual(each.types[key], types[key])) {
				return false
			}
		}
		return true
	})
	return !every ? "add" : "remove"
}

// Adds or removes types on the current range.
function addOrRemoveTypesOnSelection(e, types) {
	const { x1, x2 } = getShorthandVars(e)

	const ch = aggregate(e.elements.slice(x1, x2 + 1), e.range)
	const method = testMethod(ch, types)

	switch (method) {
	case "plaintext":
		for (const textNode of ch) {
			textNode.types = {}
		}
		break
	case "add":
		for (const textNode of ch) {
			for (const type of Object.keys(types)) {
				textNode.types[type] = types[type]
			}
		}
		break
	case "remove":
		for (const textNode of ch) {
			for (const type of Object.keys(types)) {
				delete textNode.types[type]
			}
		}
		break
	default:
		throw new Error(`addOrRemoveTypesOnSelection: no such method; method=${method}`)
	}

	e.elements.slice(x1, x2 + 1)
		.map(each => deferOnChildren(each.props.children))
}

export default addOrRemoveTypesOnSelection
