import formatsEnum from "./formatsEnum"

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
		const type = Number(ref.getAttribute("data-codex-type"))
		if (!isNaN(type)) { // NOTE: "type" can be 0; !isNaN(Number(undefined))
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
	span.formats.sort()
	return span
}

// Reads spans from a UUID element.
export function readSpans(uuidElement) {
	const spans = []
	for (const domNode of uuidElement.childNodes) {
		// // TODO
		// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
		// 	// No-op
		// 	continue
		// }
		const span = readSpan(domNode)
		if (typeof span === "string") {
			if (spans.length && typeof spans[spans.length - 1] === "string") {
				spans[spans.length - 1] += span
				continue
			}
		}
		spans.push(span)
	}
	console.log(spans)
	return spans
}
