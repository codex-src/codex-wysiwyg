import JSONEqual from "lib/JSON/JSONEqual"

// Defers on children; drops empty text nodes and merges
// fragmented text nodes.
function deferOnChildren(children) {
	for (let x = children.length - 1; x >= 0; x--) {
		if (!children[x].props.children) {
			children.splice(x, 1)
			continue
		}
		let prev = null
		if (x >= 0) {
			prev = children[x - 1]
		}
		const curr = children[x]
		if (prev && JSONEqual(prev.types, curr.types)) {
			children.splice(x - 1, 2, {
				...prev,
				props: {
					...prev.props,
					children: prev.props.children +
						curr.props.children,
				},
			})
		}
	}
	return children
}

export default deferOnChildren
