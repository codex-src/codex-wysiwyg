// import Editor from "Editor/Editor"
import domUtils from "lib/domUtils"
import React from "react"

// ;(() => {
// 	document.body.classList.add("debug-css")
// })()

const raw = `
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

// <blockquote>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
// </blockquote>
//
// <ul>
//   <Node> <- <li> (needs props)
//     <Span>
//     <Span>
//   <Node>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
// </ul>
//
// <pre>
//   <ul>
//     <Node> <- <li> (needs props)
//       <Span>
//       <Span>
//     </Node>
//   </Ul>
// </pre>

// elements[0].nodes[0].spans.insert(2, 7, text)
// elements[0].nodes[0].spans.format(2, 7, formats, props)

// // elements[0].nodes[0].spans
// const elements = [
// 	{
// 		type: ...,
// 		key: ...,
// 		// ...props
// 		nodes: [
// 			{
// 				type: "",
// 				key: "",
// 				// ...props
// 				spans: [
// 					{
// 						formats: [..., ...],
// 						[formats.a]: {
// 							// ...
// 						},
// 						text: ...,
// 					},
// 					{
// 						formats: [..., ...],
// 						[formats.a]: {
// 							// ...
// 						},
// 						text: ...,
// 					},
// 				],
// 			},
// 		],
// 	},
// ]
//
// // elements[0].spans
// const elements = [
// 	{
// 		type: ...,
// 		key: ...,
// 		// ...props
// 		spans: [
// 			{
// 				formats: [..., ...],
// 				[formats.a]: {
// 					// ...
// 				},
// 				text: ...,
// 			},
// 			{
// 				formats: [..., ...],
// 				[formats.a]: {
// 					// ...
// 				},
// 				text: ...,
// 			},
// 		],
// 	},
// ]

// // elements[0].nodes[0].spans.insert(2, 7, text)
// // elements[0].nodes[0].spans.format(2, 7, types, props)
// const elements = [
// 	{
// 		type: ...,
// 		// ...props
// 		nodes: [
// 			{
// 				key: ...,
// 				// ...props
// 				spans: {
// 					// 1. Formats must be ordered based on offsets.
// 					// 2. Offsets must be discrete.
// 					formats: [
// 						{
// 							formats: ["strong"],
// 							offsets: [7, 12], // Bounded text;
// 							[formats.a]: {
// 								href: "https://google.com",
// 							},
// 						},
// 						{
// 							typse: ["em"],
// 							offsets: [14, 37],
// 							[formats.a]: {
// 								href: "https://google.com",
// 							},
// 						},
// 					],
// 					text: "Hello, world! How are you today?",
// 				},
// 			},
// 		],
// 	},
// ]

// Recurses on a DOM node; removes extraneous whitespace.
function toHTML_recurse(domNode, depth = -1) {
	if (domUtils.isTextNodeOrBrElement(domNode)) {
		if (domUtils.isTextNode(domNode)) {
			//
			// ^                     - BOF
			//   \n                  - EOL
			//   \t{depth}           - depth tabs
			// |                     - OR
			//   \n                  - EOL
			//   \t{depth - 1,depth} - depth - 1 to depth tabs
			// $                     - EOF
			//
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

// Parses raw data to HTML.
function toHTML(raw) {
	const article = document.createElement("article")
	const doc = new DOMParser().parseFromString(raw, "text/html")
	article.append(...doc.body.children)
	return toHTML_recurse(article)
}

console.log(toHTML(raw).outerHTML)

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			Hello, world!
		</div>
	</div>
)

export default App
