import areEqualJSON from "lib/areEqualJSON"
import omitKey from "lib/omitKey"
import { sortedTypeMap } from "../components/typeMaps"

// Compares whether spans are equal (omits props.children).
function areEqualTypesAndProps(ref1, ref2) {
	const ok = (
		areEqualJSON(ref1.types, ref2.types) &&
		areEqualJSON(omitKey(ref1.props, "children"), omitKey(ref2.props, "children"))
	)
	return ok
}

// Merges fragmented spans; spans must share equal types and
// props to be merged.
function mergeSpans(spans) {
	for (let x = 0; x < spans.length; x++) {
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
function sortTypes(type1, type2) {
	const x1 = sortedTypeMap[type1]
	if (x1 === undefined) {
		throw new Error("Spans.sortTypes: no such type")
	}
	const x2 = sortedTypeMap[type2]
	if (x2 === undefined) {
		throw new Error("Spans.sortTypes: no such type")
	}
	return x1 - x2
}

// NOTE: Does not return a new copy of spans; mutates
// references.
function defer(spans) {
	mergeSpans(spans)
	spans.map(each => each.types.sort(sortTypes))
}

export default defer
