import * as Spans from "../Spans"
import toArray from "lib/toArray"
import uuidv4 from "uuid/v4"

// Parses nodes from React elements.
function parseReact(reactElements) {
	const nodes = []
	for (const each of toArray(reactElements)) {
		const node = {
			type: each.type,
			key: uuidv4(),
			props: {
				children: Spans.parseReact(each.props.children),
			},
		}
		Spans.sort(Spans.merge(node.props.children))
		nodes.push(node)
	}
	return nodes
}

export default parseReact
