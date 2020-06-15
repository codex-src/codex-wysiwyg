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

// Reads spans from a UUID element.
export function readSpans(uuidElement) {
	const spans = []
	for (let x = 0; x < uuidElement.childNodes.length; x++) {
		const span = readSpan(uuidElement.childNodes[x])
		if (x && formatsAndPropsAreEqual(spans[spans.length - 1], span)) {
			spans[spans.length - 1].content += span.content
			continue
		}
		spans.push(span)
	}
	console.log(spans)
	return spans
}
