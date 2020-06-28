import domUtils from "lib/domUtils"

// ^                     - BOF
//   \n                  - EOL
//   \t{depth}           - depth tabs
// |                     - OR
//   \n                  - EOL
//   \t{depth - 1,depth} - depth - 1 to depth tabs
// $                     - EOF

// Processes a DOM tree; removes extraneous tabs and EOLs.
function processDOMTree(domNode, depth = -1) {
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
		processDOMTree(each, depth + 1)
	}
}

export default processDOMTree
