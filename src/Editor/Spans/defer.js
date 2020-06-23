import areEqualJSON from "lib/areEqualJSON"
import omitKey from "lib/omitKey"
import { sortedTypeMap } from "../components/typeMaps"

// Compares whether spans are equal (omits props.children).
function areEqualTypesAndProps(span1, span2) {
	const ok = (
		areEqualJSON(span1.types, span2.types) &&
		areEqualJSON(omitKey(span1.props, "children"), omitKey(span2.props, "children"))
	)
	return ok
}

// Merges fragmented spans; spans must share equal types and
// props to be merged.
function merge(spans) {
	for (let x = 0; x < spans.length; x++) {
		// // ... Note that empty spans are dropped.
		// if (!spans[x].props.children) {
		// 	spans.splice(x, 1)
		// 	continue
		// }
		if (x && areEqualTypesAndProps(spans[x - 1], spans[x])) {
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

// Compares span types based on render precedence.
function compareTypes(type1, type2) {
	const x1 = sortedTypeMap[type1]
	if (x1 === undefined) {
		throw new Error("Spans.compareTypes: no such type")
	}
	const x2 = sortedTypeMap[type2]
	if (x2 === undefined) {
		throw new Error("Spans.compareTypes: no such type")
	}
	return x1 - x2
}

// NOTE: Does not return a new copy of spans; mutates
// references.
function defer(spans) {
	merge(spans)
	spans.map(each => each.types.sort(compareTypes))
}

export default defer
