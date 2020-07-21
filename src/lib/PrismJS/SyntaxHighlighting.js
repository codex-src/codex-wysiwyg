import langMap from "lib/PrismJS/langMap"
import React from "react"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"

const SyntaxHighlighting = React.memo(({ extension, children }) => {
	const ref = React.useRef()

	const [ready, setReady] = React.useState(false)

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

			// if (ready) {
			// 	console.error(`SyntaxHighlighting: langMap[extension] === undefined; extension=${extension}`)
			// }

			// No-op
			return
		}
		const html = window.Prism.highlight(children, lang, extension)
		ref.current.innerHTML = html
	}, [
		ready, // Rerenders on ready; DOMContentLoaded
		extension,
		children,
	])

	return (
		<div ref={ref} className={extension || `language-${extension}`}>
			{children}
		</div>
	)
})

export default SyntaxHighlighting
