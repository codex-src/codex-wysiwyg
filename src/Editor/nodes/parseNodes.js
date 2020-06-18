import parseSpans from "../spans/parseSpans"
import toArray from "lib/toArray"
import uuidv4 from "uuid/v4"
import { typeEnum } from "../components/typeInfo"

// Parses nodes from React elements.
function parseNodes(reactElements) {
	const nodes = []
	for (const each of toArray(reactElements)) {
		switch (each.type) {
		case typeEnum.h1:
		case typeEnum.h2:
		case typeEnum.h3:
		case typeEnum.h4:
		case typeEnum.h5:
		case typeEnum.h6:
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: parseSpans(each.props.children),
				},
			})
			break
		case typeEnum.p:
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: parseSpans(each.props.children),
				},
			})
			break
		case typeEnum.hr:
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: null,
				},
			})
			break
		default:
			throw new Error("FIXME: unknown type")
		}
	}
	return nodes
}

export default parseNodes
