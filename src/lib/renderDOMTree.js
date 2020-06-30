import ReactDOM from "react-dom"

// Renders a React component to a DOM tree.
function renderDOMTree(Component) {
	const temp = document.createElement("div")
	ReactDOM.render(Component, temp)
	return temp.childNodes[0]
}

export default renderDOMTree
