// Render precedence order.
const SORT_ORDER = {
	"code":   0,
	"a":      1,
	"strike": 2,
	"strong": 3,
	"em":     4,
}

// Sorts types based on render precedence.
function sorter(t1, t2) {
	return SORT_ORDER[t1] - SORT_ORDER[t2]
}

// Convert a type map to a sorted type array.
function convTypesToArray(types) {
	const keys = Object.keys(types).sort(sorter)
	return keys.reduce((acc, each) => {
		acc.push({
			type: each,
			props: types[each],
		})
		return acc
	}, [])
}

export default convTypesToArray
