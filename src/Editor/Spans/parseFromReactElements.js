import omitKeys from "lib/omitKeys"
import toArray from "lib/toArray"
import { typeMap } from "../components/typeMaps"

// Parses spans from React elements.
function parseFromReactElements(reactElements) {
	const spans = []
	const recurse = (reactElement, types = [], props = {}) => {
		for (const each of toArray(reactElement)) {
			// Guard <p></p> and <p><br></p> cases:
			//
			// TODO: Guard <em></em> case.
			if (each === undefined || (each.type && !typeMap[each.type])) { // TODO: Move up?
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
			const nextProps = { ...props, [each.type]: omitKeys(each.props, "children") }
			recurse(each.props.children, nextTypes, nextProps)
		}
	}
	recurse(reactElements)
	return spans
}

export default parseFromReactElements
