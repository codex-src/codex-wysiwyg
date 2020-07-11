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

export default sorter
