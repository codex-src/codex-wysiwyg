import langMap from "lib/PrismJS/langMap"
import React from "react"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"

const SyntaxHighlighting = React.memo(({ extension, children }) => {
	const [ready, setReady] = React.useState(false)
	const [htmlChildren, setHTMLChildren] = React.useState(null)

	useDOMContentLoadedCallback(() => {
		setReady(true)
	})

	React.useEffect(() => {
		if (!extension || extension === "plaintext") {
			// No-op
			return
		}
		const lang = langMap[extension]
		if (lang === undefined) {
			// No-op
			return
		}
		const __html = window.Prism.highlight(children, lang, extension)
		setHTMLChildren((
			<div
				className={extension && `language-${extension}`}
				dangerouslySetInnerHTML={{
					__html,
				}}
			/>
		))
	}, [
		ready, // Rerenders on ready; DOMContentLoaded
		extension,
		children,
	])

	return htmlChildren || children
})

export default SyntaxHighlighting
