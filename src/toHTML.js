import domUtils from "lib/domUtils"

// ^                     - BOF
//   \n                  - EOL
//   \t{depth}           - depth tabs
// |                     - OR
//   \n                  - EOL
//   \t{depth - 1,depth} - depth - 1 to depth tabs
// $                     - EOF

// Recurser for toHTML.
function toHTML_recurse(domNode, depth = -1) {
	if (domUtils.isTextNodeOrBrElement(domNode)) {
		if (domUtils.isTextNode(domNode)) {
			const tabsRe = new RegExp(`^\\n\\t{${depth}}|\\n\\t{${Math.max(0, depth - 1)},${depth}}?$`, "g")
			// domNode.textContent = unescape(domNode.textContent.replace(tabsRe, ""))
			domNode.textContent = domNode.textContent.replace(tabsRe, "")
			if (!domNode.textContent) {
				domNode.remove()
			}
		}
		return
	}
	const T = domUtils.nodeName(domNode)
	if (domUtils.isElement(domNode) && T !== "hr" && !domNode.childNodes.length) {
		throw new Error((
			"toHTML.recurse: " +
			"A DOM node must have one or more children or childNodes; " +
			`domNode.outerHTML=${domNode.outerHTML.replace("\n", "\\n")}`
		))
	}
	// NOTE: Uses [...].reverse() because of domNode.remove().
	for (const each of [...domNode.childNodes].reverse()) {
		toHTML_recurse(each, depth + 1)
	}
	return domNode
}

// Parses raw data to HTML.
//
// TODO: Refactor based on components.js.
function toHTML(raw) {
	const article = document.createElement("article")
	const doc = new DOMParser().parseFromString(raw, "text/html")
	article.append(...doc.body.children)
	return toHTML_recurse(article)
}

export default toHTML
