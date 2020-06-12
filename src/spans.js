import {
	formatsEnum,
	formatsEnumMap,
	// sortFormats,
} from "./formatsEnum"

// Reads a span from a DOM node.
//
// TODO: Move props to JSON? E.g. data-codex-props="{ ... }"
function readSpan(domNode) {
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
				span[formatsEnum.anchor] = JSON.parse(ref.getAttribute("data-codex-props"))
			}
		}
		ref = ref.children.length &&
			ref.children[0]
	}
	if (!span.formats.length) {
		return span.content
	}
	span.formats.sort(/* sortFormats */)
	return span
}

// Reads spans from an element.
function readSpans(element) {
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