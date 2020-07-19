import JSONEqual from "lib/JSON/JSONEqual"

// Concatenates children that are equal in types and props.
function concat(children) {
	for (let x = children.length - 1; x >= 0; x--) {
		// const prev = x === -1 ? null : children[x - 1]
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
}

export default concat
