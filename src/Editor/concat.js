import areEqualJSON from "lib/areEqualJSON"
import omit from "lib/omit"

// Compares whether span types and props are deeply equal.
function areEqualTypesAndProps(span1, span2) {
	return areEqualJSON(omit(span1, "text"), omit(span2, "text"))
}

// Concatenates an array of spans; concatenates fragmented
// spans. Uses reverse order because spans.length is
// unstable.
function concat(spans) {
	for (let x = spans.length - 1; x >= 0; x--) {
		if (x - 1 >= 0 && areEqualTypesAndProps(spans[x - 1], spans[x])) {
			spans.splice(x - 1, 2, {
				...spans[x - 1],
				text: spans[x - 1].text + spans[x].text,
			})
		}
	}
	return spans
}

export default concat
