import formatsEnum from "./formatsEnum"

// Reads a span from a DOM node.
function readSpan(domNode) {
	const span = {
		content: domNode.textContent,
		formats: [],
	}
	if (domNode.nodeType === Node.TEXT_NODE) {
		span.content = domNode.textContent
		return span
	}
	let ref = domNode
	while (ref) {
		const attr = ref.getAttribute("data-codex-type")
		if (attr) {
			const type = Number(attr)
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

// // TODO
// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Reads spans from a UUID element.
export function readSpans(uuidElement) {
	const spans = []
	for (const domNode of uuidElement.childNodes) {
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
