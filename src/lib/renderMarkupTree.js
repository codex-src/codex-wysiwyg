// Renders markup to a tree.
function renderMarkupTree(markup) {
	const doc = new DOMParser().parseFromString(markup, "text/html")
	return doc.body.childNodes[0]
}

export default renderMarkupTree
