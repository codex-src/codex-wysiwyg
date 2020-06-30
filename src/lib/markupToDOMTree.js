// Renders markup to a DOM tree.
//
// NOTE: Uses <div>...</div> to preserve tabs.
function markupToDOMTree(markup) {
	// <body> <- document.body
	//   <div> <- <div>...</div>
	//     <-- ... -->
	//   </div>
	// </body>
	//
	const doc = new DOMParser().parseFromString("<div>" + markup + "</div>", "text/html")
	return doc.body.childNodes[0]
}

export default markupToDOMTree
