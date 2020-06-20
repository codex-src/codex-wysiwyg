import * as Spans from "../Spans"
import shortUUID from "lib/shortUUID"
import toArray from "lib/toArray"

// Parses elements from React elements.
function parseReact(reactElements) {
	const elements = []
	for (const each of toArray(reactElements)) {
		const element = {
			type: each.type,
			key: shortUUID(),
			props: {
				children: Spans.parseReact(each.props.children),
			},
		}
		Spans.sort(Spans.merge(element.props.children))
		elements.push(element)
	}
	return elements
}

export default parseReact
