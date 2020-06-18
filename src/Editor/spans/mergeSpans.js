import omitKey from "lib/omitKey"

// Compares whether two span containers are equal (compares
// types and type-props).
function areEqualContainers(c1, c2) {
	const ok = (
		JSON.stringify(c1.types) === JSON.stringify(c2.types) &&
		JSON.stringify(omitKey(c1.props, "children")) === JSON.stringify(omitKey(c2.props, "children"))
	)
	return ok
}

// Merges spans that share containers.
function mergeSpans(spans) {
	for (let x = 0; x < spans.length; x++) {
		if (x - 1 >= 0 && areEqualContainers(spans[x - 1], spans[x])) {
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

export default mergeSpans
