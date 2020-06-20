import * as Spans from "../Spans"
import toArray from "lib/toArray"
import uuidv4 from "uuid/v4"

// Parses elements from React elements.
function parseReact(reactElements) {
	const elements = []
	for (const each of toArray(reactElements)) {
		const element = {
			type: each.type,
			key: uuidv4().slice(0, 8),
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
