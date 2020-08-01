import langMap from "lib/PrismJS/langMap"
import React from "react"

const MemoHighlight = React.memo(({ extension, children }) => {
	let html = children
	const parser = langMap[extension]
	if (parser) {
		html = window.Prism.highlight(children, parser, extension)
	}

	return <div className={extension && `language-${extension}`} dangerouslySetInnerHTML={{ __html: html }} />
})

export default MemoHighlight
