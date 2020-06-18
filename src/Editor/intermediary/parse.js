import omitKey from "lib/omitKey"
import toArray from "lib/toArray"

// Parses intermediary inline elements from React elements.
function parseInline(children) {
	const intermediary = []
	const recurse = (reactElement, types = [], props = {}) => {
		for (const each of toArray(reactElement)) {
			if (typeof each === "string") {
				intermediary.push({
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
				// Next types:
				[...types, each.type],
				// Next props:
				{ ...props, [each.type]: omitKey(each.props, "children") },
			)
		}
	}
	recurse(children)
	return intermediary
}

// Parses intermediary elements from React elements.
function parse(children) {
	const intermediary = []
	for (const each of toArray(children)) {
		switch ("<" + each.type + ">") {
		case "<h1>":
		case "<h2>":
		case "<h3>":
		case "<h4>":
		case "<h5>":
		case "<h6>":
			intermediary.push({
				type: each.type,
				props: {
					children: parseInline(each.props.children),
				},
			})
			break
		case "<p>":
			intermediary.push({
				type: each.type,
				props: {
					children: parseInline(each.props.children),
				},
			})
			break
		case "<hr>":
			intermediary.push({
				type: each.type,
				props: {
					children: null,
				},
			})
			break
		default:
			throw new Error("unknown type")
		}
	}
	return intermediary
}

export default parse
