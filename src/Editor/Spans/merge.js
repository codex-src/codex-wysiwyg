import areEqualJSON from "lib/areEqualJSON"
import omitKey from "lib/omitKey"

// Compares whether spans (sans span.children) are equal.
function areEqualSansChildren(span1, span2) {
	const ok = (
		areEqualJSON(span1.types, span2.types) &&
		areEqualJSON(omitKey(span1.props, "children"), omitKey(span2.props, "children"))
	)
	return ok
}

// Merges spans that share types and props.
function merge(spans) {
	for (let x = 0; x < spans.length; x++) {
		if (x && areEqualSansChildren(spans[x - 1], spans[x])) {
			spans.splice(x - 1, 2, {
				...spans[x - 1],
				props: {
					...spans[x - 1].props,
					children: spans[x - 1].props.children + spans[x].props.children,
				},
			})
			continue
		}
	}
	return spans
}

export default merge
