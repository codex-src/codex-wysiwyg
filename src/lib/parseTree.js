// Parses markup to a tree. A decorator can be used to
// decorate the parsed tree.
function parseTree(markup, decorator = tree => {}) {
	const doc = new DOMParser().parseFromString(markup, "text/html")
	const tree = doc.body.childNodes[0]
	decorator(tree)
	return tree
}

export default parseTree
