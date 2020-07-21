// Reads text content.
const textContent = children => {
	return children.reduce((acc, each) => {
		acc += each.props.children
		return acc
	}, "")
}

export default textContent
