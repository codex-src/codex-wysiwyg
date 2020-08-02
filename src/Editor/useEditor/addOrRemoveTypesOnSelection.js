import deferOnChildren from "./deferOnChildren"
import getShorthandVars from "./getShorthandVars"
import JSONEqual from "lib/JSON/JSONEqual"
import { createChildren } from "./aggregateChildren"

// Tests for "plaintext", "add", or "remove".
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

	const ch = createChildren(e.elements.slice(x1, x2 + 1), e.range)
	if (!ch.length) {
		// No-op
		return
	}

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
