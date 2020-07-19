// Maps types to render precedence.
const renderPrecedence = {
	"code":   0,
	"a":      1,
	"strike": 2,
	"strong": 3,
	"em":     4,
}

// Sorts types based on render precedence.
function sorter(t1, t2) {
	return renderPrecedence[t1.type] - renderPrecedence[t2.type]
}

export default sorter
