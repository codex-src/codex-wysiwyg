import formatsEnum from "./formatsEnum"

// // TODO
// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

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

// Returns whether two spans’ formats and props are equal.
function formatsAndPropsAreEqual(spanA, spanB) {
	if (spanA.formats.length !== spanB.formats.length) {
		return false
	}
	for (let x = 0; x < spanA.formats.length; x++) {
		if (spanA.formats[x] !== spanB.formats[x]) {
			return false
		} else if (JSON.stringify(spanA[spanA.formats[x]]) !== JSON.stringify(spanB[spanB.formats[x]])) {
			return false
		}
	}
	return true
}

// Merges redundant spans (e.g. fragmented).
export function mergeRedundantSpans(spans) {
	for (let x = 0; x < spans.length; x++) {
		if (x && formatsAndPropsAreEqual(spans[x - 1], spans[x])) {
			spans.splice(x - 1, 2, {
				...spans[x - 1],
				content: spans[x - 1].content + spans[x].content,
			})
			continue
		}
	}
}

// Reads spans from a UUID element.
export function readSpans(uuidElement) {
	const spans = []
	for (let x = 0; x < uuidElement.childNodes.length; x++) {
		spans.push(readSpan(uuidElement.childNodes[x]))
	}
	mergeRedundantSpans(spans)
	console.log(spans)
	return spans
}
