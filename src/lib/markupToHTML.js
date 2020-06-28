// Renders markup to HTML.
function markupToHTML(text_html) {
	const fragment = document.createDocumentFragment()
	const doc = new DOMParser().parseFromString(text_html, "text/html")
	fragment.append(...doc.body.childNodes)
	return fragment
}

export default markupToHTML
