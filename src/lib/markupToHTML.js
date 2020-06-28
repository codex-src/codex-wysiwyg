// Renders markup to HTML.
function markupToHTML(markup) {
	const fragment = document.createDocumentFragment()
	const doc = new DOMParser().parseFromString(markup, "text/html")
	fragment.append(...doc.body.childNodes)
	return fragment
}

export default markupToHTML
