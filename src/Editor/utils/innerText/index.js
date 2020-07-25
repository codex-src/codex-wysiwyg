import textContent from "../textContent"

// Mocks the browser API.
function innerText(elements) {
	return elements.reduce((acc, each, x) => {
		if (x > 0) {
			acc += "\n"
		}
		acc += textContent(each.props.children)
		return acc
	}, "")
}

export default innerText
