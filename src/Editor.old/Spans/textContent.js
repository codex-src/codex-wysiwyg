// Reads text content from an array of spans.
//
// TODO: Add support for non-standard types here?
function textContent(spans) {
	const reducer = (acc, each) => acc + each.props.children
	return spans.reduce(reducer, "")
}

export default textContent
