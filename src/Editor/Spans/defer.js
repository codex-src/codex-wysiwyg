import areEqualJSON from "lib/areEqualJSON"
import check from "lib/check"
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
function compareTypes(T1, T2) {
	const x1 = check(sortedTypeMap[T1])
	const x2 = check(sortedTypeMap[T2])
	return x1 - x2
}

function defer(spans) {
	merge(spans)
	spans.map(each => each.types.sort(compareTypes))
}

export default defer
