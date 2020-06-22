import * as Spans from "../Spans"
import newShortUUID from "lib/newShortUUID"
import toArray from "lib/toArray"

// Parses elements from React elements.
function parseFromReactElements(reactElements) {
	const elements = []
	for (const each of toArray(reactElements)) {
		// TODO: Use construct() and Object.assign?
		const element = {
			type: each.type,
			key: newShortUUID(),
			props: {
				children: Spans.parseFromReactElements(each.props.children),
			},
		}
		Spans.defer(element.props.children)
		elements.push(element)
	}
	return elements
}

export default parseFromReactElements
