import omitKey from "lib/omitKey"
import toArray from "lib/toArray"
import { typeMap } from "../components/typeMaps"

// Parses spans from React elements.
//
// TODO: Add parseHTML?
function parseReact(reactElements) {
	const spans = []
	// Recurses on a React element, uses types and props as
	// context for the next span.
	const recurse = (reactElement, types = [], props = {}) => {
		for (const each of toArray(reactElement)) {
			// Guard <p></p> and <p><br></p> cases:
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
			recurse(
				each.props.children,
				[...types, each.type], // Next types
				{ ...props, [each.type]: omitKey(each.props, "children") }, // Next props
			)
		}
	}
	recurse(reactElements)
	return spans
}

export default parseReact
