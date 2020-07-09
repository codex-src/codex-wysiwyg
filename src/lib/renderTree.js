import ReactDOM from "react-dom"

// Renders a React component to a tree.
//
// NOTE: ReactDOM.render renders asynchronously.
function renderTree(component) {
	const div = document.createElement("div")
	ReactDOM.render(component, div)
	return div.childNodes[0]
}

export default renderTree
