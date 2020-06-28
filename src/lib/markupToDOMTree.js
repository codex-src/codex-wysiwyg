// Renders markup to a DOM tree.
function markupToDOMTree(markup) {
	const domTree = document.createDocumentFragment()
	const doc = new DOMParser().parseFromString(markup, "text/html")
	domTree.append(...doc.body.childNodes)
	return domTree
}

export default markupToDOMTree
