// Parses markup to a tree. A decorator can be used to
// decorate the parsed tree.
function parseTree(markup, decorator = null) {
	const doc = new DOMParser().parseFromString(markup, "text/html")
	const tree = doc.body.childNodes[0]
	if (decorator) {
		decorator(tree)
	}
	return tree
}

export default parseTree
