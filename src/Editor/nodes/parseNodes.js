import parseSpans from "../spans/parseSpans"
import toArray from "lib/toArray"
import uuidv4 from "uuid/v4"

// Parses nodes from React elements.
function parseNodes(reactElements) {
	const nodes = []
	for (const each of toArray(reactElements)) {
		switch (each.type) {
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: parseSpans(each.props.children),
				},
			})
			break
		case "p":
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: parseSpans(each.props.children),
				},
			})
			break
		case "hr":
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: null,
				},
			})
			break
		default:
			throw new Error("unknown type")
		}
	}
	return nodes
}

export default parseNodes
