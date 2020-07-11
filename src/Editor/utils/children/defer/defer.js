import JSONEqual from "lib/JSONEqual"
import omit from "lib/omit"

// Maps types to render precedence.
const renderPrecedence = {
	"code":   0,
	"a":      1,
	"strike": 2,
	"strong": 3,
	"em":     4,
}

// Sorts types based on render precedence.
function sorter(T1, T2) {
	return renderPrecedence[T1] - renderPrecedence[T2]
}

// Compares types and props.
function shouldCombine(e1, e2) {
	return JSONEqual(omit(e1, "value"), omit(e2, "value"))
}

// Combines children that are equal in types and props.
function combine(children) {
	for (let x = children.length - 1; x >= 0; x--) {
		if (x - 1 >= 0 && shouldCombine(children[x - 1], children[x])) {
			children.splice(x - 1, 2, {
				...children[x - 1],
				value: children[x - 1].value + children[x].value,
			})
		}
	}
	return children
}

// Deferer for children. This function should be invoked
// after children are created or mutated.
function defer(children) {
	children.map(each => each.types.sort(sorter))
	combine(children)
}

export default defer
