import ReactDOM from "react-dom"

// Renders React components to a DOM tree.
//
// NOTE: ReactDOM.render renders asynchronously.
function renderDOMTree(Component, callback = null) {
	const div = document.createElement("div")
	ReactDOM.render(Component, div, callback)
	return div.childNodes[0]
}

export default renderDOMTree
