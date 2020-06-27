// import Editor from "Editor/Editor"
import domUtils from "lib/domUtils"
import React from "react"

// ;(() => {
// 	document.body.classList.add("debug-css")
// })()

// const rawStr = `
// <ul>
// 	<li>
// 		Hello,&lt;em&gt;
// 		<code>
// 			world
// 		</code>
// 		!
// 	</li>
// </ul>
// <ul>
// 	<li>
// 		x
// 	</li>
// </ul>
// <hr>
// <ul>
// 	<li>
// 		x
// 	</li>
// </ul>
// <ul>
// 	<li>
// 		x
// 	</li>
// </ul>
// `

const rawStr = `
<p>
	Hello, <a><code><strike><strong><em>world</em></strong></strike></code></a>
</p>
<p>
	Hello, <code><strike><strong><em>world</em></strong></strike></code>
</p>
<p>
	Hello, <strike><strong><em>world</em></strong></strike>
</p>
<p>
	Hello, <strong><em>world</em></strong>
</p>
<p>
	Hello, <em>world</em>
</p>
<p>
	Hello, world
</p>
`

// Recurses on a DOM node; removes extraneous whitespace.
function toHTML_recurse(domNode, depth = -1) {
	if (domUtils.isTextNodeOrBrElement(domNode)) {
		if (domUtils.isTextNode(domNode)) {
			//
			// ^                      - BOF
			//   \n                   - EOL
			//   \t{depth}            - depth tabs
			// |                      - OR
			//   \n                   - EOL
			//   \t{depth - 1, depth} - depth - 1 to depth tabs
			// $                      - EOF
			//
			const tabsRe = new RegExp(`^\\n\\t{${depth}}|\\n\\t{${Math.max(0, depth - 1)},${depth}}?$`, "g")
			// domNode.nodeValue = unescape(domNode.nodeValue.replace(tabsRe, ""))
			domNode.nodeValue = domNode.nodeValue.replace(tabsRe, "")
			if (!domNode.nodeValue) {
				domNode.remove()
			}
		}
		return
	}
	const T = domUtils.nodeName(domNode)
	if (domUtils.isElement(domNode) && T !== "hr" && !domNode.childNodes.length) {
		throw new Error((
			"toHTML_recurse: " +
			"A DOM node must have one or more children or childNodes; " +
			`domNode.outerHTML=${domNode.outerHTML.replace("\n", "\\n")}`
		))
	}
	// NOTE: Iterates backwards because recurse can remove
	// text nodes.
	for (const each of [...domNode.childNodes].reverse()) {
		toHTML_recurse(each, depth + 1)
	}
	return domNode
}

// Parse a raw string to HTML.
function toHTML(rawStr) {
	const article = document.createElement("article")
	const doc = new DOMParser().parseFromString(rawStr, "text/html")
	article.append(...doc.body.children)
	return toHTML_recurse(article)
}

console.log(toHTML(rawStr).outerHTML)

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			Hello, world!
		</div>
	</div>
)

export default App
