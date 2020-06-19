import * as Spans from "../Spans"
import toArray from "lib/toArray"
import uuidv4 from "uuid/v4"
import { typeEnum } from "../components/typeMaps"

// Parses nodes from React elements.
//
// TODO (1): Add parseHTML?
// TODO (2): Add Spans.merge and Spans.sort?
function parseReact(reactElements) {
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
					children: Spans.parseReact(each.props.children),
				},
			})
			break
		case typeEnum.p:
			nodes.push({
				type: each.type,
				key: uuidv4(),
				props: {
					children: Spans.parseReact(each.props.children),
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

export default parseReact
