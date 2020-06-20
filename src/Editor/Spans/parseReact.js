import omitKey from "lib/omitKey"
import toArray from "lib/toArray"
import { typeMap } from "../components/typeMaps"

// Parses spans from React elements.
function parseReact(reactElements) {
	const spans = []
	const recurse = (reactElement, types = [], props = {}) => {
		for (const each of toArray(reactElement)) {
			// Guard <p></p> and <p><br></p> cases:
			//
			// TODO: Guard <em></em> case; "omitKey: no such key
			// (key=children)".
			if (each === undefined || (each.type && !typeMap[each.type])) {
				// No-op
				continue
			}
			if (typeof each === "string") {
				spans.push({
					types,
					props: {
						...props,
						children: each,
					},
				})
				continue
			}
			const nextTypes = [...types, each.type]
			const nextProps = { ...props, [each.type]: omitKey(each.props, "children") }
			recurse(each.props.children, nextTypes, nextProps)
		}
	}
	recurse(reactElements)
	return spans
}

export default parseReact
