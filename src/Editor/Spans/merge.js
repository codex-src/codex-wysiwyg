import areEqualJSON from "lib/areEqualJSON"
import omitKey from "lib/omitKey"

function areEqual(s1, s2) {
	const ok = (
		areEqualJSON(s1.types, s2.types) &&
		areEqualJSON(omitKey(s1.props, "children"), omitKey(s2.props, "children"))
	)
	return ok
}

// Merges synthetic spans that share types and props.
function merge(spans) {
	for (let x = 0; x < spans.length; x++) {
		if (x && areEqual(spans[x - 1], spans[x])) {
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
