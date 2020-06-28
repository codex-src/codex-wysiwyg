import ReactDOM from "react-dom"

// Renders a React component to a DOM tree.
function renderDOMTree(Component, callback = null) {
	const div = document.createElement("div")
	ReactDOM.render(Component, div, callback)
	return div.childNodes[0]
}

export default renderDOMTree
