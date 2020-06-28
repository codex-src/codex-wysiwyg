import domUtils from "lib/domUtils"

// ^                     - BOF
//   \n                  - EOL
//   \t{depth}           - depth tabs
// |                     - OR
//   \n                  - EOL
//   \t{depth - 1,depth} - depth - 1 to depth tabs
// $                     - EOF

// Cleans extraneous tabs and EOLs from a DOM tree.
function cleanDOMTree(domNode, depth = -1) { // Recurses on a DOM node
	if (domUtils.isTextNodeOrBrElement(domNode)) {
		if (domUtils.isTextNode(domNode)) {
			const tabsRe = new RegExp(`^\\n\\t{${depth}}|\\n\\t{${Math.max(0, depth - 1)},${depth}}?$`, "g")
			// domNode.nodeValue = unescape(domNode.nodeValue.replace(tabsRe, ""))
			domNode.nodeValue = domNode.nodeValue.replace(tabsRe, "")
			if (!domNode.nodeValue) {
				domNode.remove()
			}
		}
		return
	}
	// NOTE: Uses [...].reverse() because of domNode.remove().
	for (const each of [...domNode.childNodes].reverse()) {
		cleanDOMTree(each, depth + 1)
	}
	return domNode
}

export default cleanDOMTree
