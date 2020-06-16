import formatsEnum from "./formatsEnum"

// Computes a VDOM span from a DOM node.
function computeVDOMSpan(domNode) {
	const span = {
		textContent: domNode.textContent,
		formats: [],
	}
	if (domNode.nodeType === Node.TEXT_NODE) {
		span.textContent = domNode.textContent
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
		return span.textContent
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
				textContent: spans[x - 1].textContent + spans[x].textContent,
			})
			continue
		}
	}
}

// Computes VDOM spans from a UUID DOM element.
export function computeVDOMSpans(uuidElement) {
	const spans = []
	for (let x = 0; x < uuidElement.childNodes.length; x++) {
		// // TODO
		// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
		// 	// No-op
		// 	continue
		// }
		spans.push(computeVDOMSpan(uuidElement.childNodes[x]))
	}
	concatenateVDOMSpans(spans)
	return spans
}
