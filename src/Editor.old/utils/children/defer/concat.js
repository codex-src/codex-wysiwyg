import JSONEqual from "lib/json/JSONEqual"
import omit from "lib/omit"

// Concatenates children that are equal in types and props.
function concat(children) {
	for (let x = children.length - 1; x >= 0; x--) {
		// Reference the previous and current elements:
		let prev = null
		if (x >= 0) {
			prev = children[x - 1]
		}
		const curr = children[x]
		// Concatenate when the previous and current elements
		// containers are deeply equal:
		if (prev && JSONEqual(omit(prev, "value"), omit(curr, "value"))) {
			children.splice(x - 1, 2, {
				...prev,
				value: prev.value + curr.value,
			})
		}
	}
	return children
}

export default concat
