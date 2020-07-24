import domUtils from "lib/DOM/domUtils"
import hash from "lib/x/hash"
import JSONClone from "lib/JSON/JSONClone"
import parseRendered from "./parseRendered"
import parseSemantic from "./parseSemantic"

// Parses children; accepts a semantic or rendered parser.
function parseChildren(element, parser) {
	const children = []
	const recurse = (on, types = []) => {
		if (domUtils.isTextNode(on)) {
			children.push({
				types,
				props: {
					children: on.nodeValue,
				},
			})
			return
		}
		for (const each of on.childNodes) {
			// Guard <br> and <... contenteditable="false">:
			if (domUtils.isElement(each) && (domUtils.isBrElement(each) ||
					each.getAttribute("contenteditable") === "false")) {
				// No-op
				continue
			}
			const nextTypes = JSONClone(types)
			if (domUtils.isElement(each)) {
				const { type, props } = parser(each)
				nextTypes.push({ type, props })
			}
			recurse(each, nextTypes)
		}
	}
	recurse(element)
	return children
}

// Parses elements; accepts a semantic or rendered parser.
function parseElements(tree, parser) {
	const elements = []
	for (const each of tree.children) {
		const { type, props } = parser(each)
		elements.push({
			type,
			key: each.id || hash(),
			props: {
				...props,
				children: parseChildren(each, parser),
			},
		})
	}
	return elements
}

// Parses elements from a rendered tree.
export function parseRenderedElements(tree) {
	return parseElements(tree, parseRendered)
}

// Parses children from a rendered element.
export function parseRenderedChildren(element) {
	return parseChildren(element, parseRendered)
}

// Parses elements from a semantic tree.
export function parseSemanticElements(tree) {
	return parseElements(tree, parseSemantic)
}

// Parses children from a semantic element.
export function parseSemanticChildren(element) {
	return parseChildren(element, parseSemantic)
}
