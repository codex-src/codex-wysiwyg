// Mocks the browser API; reads text content.
function textContent(children) {
	return children.reduce((acc, each) => {
		acc += each.props.children
		return acc
	}, "")
}

export default textContent
