import concat from "./concat"
import sorter from "./sorter"

// Deferer for children. This function should be invoked
// after children are created or mutated.
function defer(children) {
	children.map(each => each.types.sort(sorter))
	concat(children)
}

export default defer
