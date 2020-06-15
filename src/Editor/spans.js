import formatsEnum from "./formatsEnum"

// // TODO
// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Reads a VDOM span from a DOM node.
function readVDOMSpan(domNode) {
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

// Returns whether two VDOM spans’ formats and props are
// equal.
function formatsAndPropsAreEqual(s1, s2) {
	if (s1.formats.length !== s2.formats.length) {
		return false
	}
	for (let x = 0; x < s1.formats.length; x++) {
		if (s1.formats[x] !== s2.formats[x]) {
			return false
		} else if (JSON.stringify(s1[s1.formats[x]]) !== JSON.stringify(s2[s2.formats[x]])) {
			return false
		}
	}
	return true
}

// Concatenates VDOM spans that share formats and props.
export function concatenateVDOMSpans(spans) {
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
export function readVDOMSpans(uuidElement) {
	const spans = []
	for (let x = 0; x < uuidElement.childNodes.length; x++) {
		spans.push(readVDOMSpan(uuidElement.childNodes[x]))
	}
	concatenateVDOMSpans(spans)
	return spans
}
