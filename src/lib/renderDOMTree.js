import ReactDOM from "react-dom"

// Renders React components to a DOM tree.
function renderDOMTree(Component) {
	const div = document.createElement("div")
	ReactDOM.render(Component, div)
	return div.childNodes[0]
}

export default renderDOMTree
