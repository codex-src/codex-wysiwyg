// Renders markup to a DOM tree.
//
// NOTE: Uses <div>...</div> to preserve tabs.
function markupToDOMTree(markup) {
	// <body> <- document.body
	//   <-- ... --> <- document.body.childNodes[0]
	// </body>
	//
	const doc = new DOMParser().parseFromString(markup, "text/html")
	return doc.body.childNodes[0]
}

export default markupToDOMTree
