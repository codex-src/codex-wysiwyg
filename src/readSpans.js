import {
	formatsEnum,
	formatsEnumMap,
} from "./formatsEnum"

// Reads a span data structure from an element.
//
// TODO: Move props to JSON? E.g. data-codex-props="{ ... }"
const readSpan = domNode => {
	if (domNode.nodeType === Node.TEXT_NODE) {
		return domNode.textContent
	}
	const span = {
		content: domNode.textContent,
		formats: [],
	}
	let ref = domNode
	while (ref) {
		const type = formatsEnumMap[ref.getAttribute("data-codex-type")]
		if (type !== undefined) { // NOTE: "type" can be 0
			span.formats.push(type)
			if (type === formatsEnum.anchor) {
				span[formatsEnum.anchor] = {
					href: ref.getAttribute("data-codex-href"),
				}
			}
		}
		ref = ref.children.length &&
			ref.children[0]
	}
	if (!span.formats.length) {
		return span.content
	}
	span.formats.sort()
	return span
}

// Reads span data structures from an element.
const readSpans = element => {
	const spans = []
	for (const domNode of element.childNodes) {
		const span = readSpan(domNode)
		if (typeof span === "string" && (spans.length && typeof spans[spans.length - 1] === "string")) {
			spans[spans.length - 1] += span
			continue
		}
		spans.push(span)
	}
	return spans
}

export default readSpans
