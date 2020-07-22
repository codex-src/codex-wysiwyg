import langMap from "lib/PrismJS/langMap"
import React from "react"
import tmpl from "lib/x/tmpl"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"

const Highlight = React.memo(({ className, style, extension, children }) => {
	const [DOMContentLoaded, setDOMContentLoaded] = React.useState(false)

	useDOMContentLoadedCallback(() => {
		setDOMContentLoaded(true)
	})

	const $children = React.useMemo(() => {
		if (!DOMContentLoaded) {
			return children
		}
		let __html = children
		const parser = langMap[extension]
		if (parser) {
			__html = window.Prism.highlight(children, parser, extension)
		}
		return (
			<div
				className={tmpl`${extension && `language-${extension}`} ${className}`}
				style={style}
				dangerouslySetInnerHTML={{
					__html,
				}}
			/>
		)
	}, [
		DOMContentLoaded,
		className,
		style,
		extension,
		children,
	])

	return $children
})

export default Highlight
