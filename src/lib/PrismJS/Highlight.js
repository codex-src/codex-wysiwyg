// import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"
import langMap from "lib/PrismJS/langMap"
import React from "react"
import tmpl from "lib/x/tmpl"

const Highlight = React.memo(({ className, style, extension, children }) => {
	// const [ready, setReady] = React.useState(false)

	// useDOMContentLoadedCallback(() => {
	// 	setReady(true)
	// })

	// NOTE: Use useMemo not useState; state needs to be
	// updated eagerly
	const $children = React.useMemo(() => {
		let html = children
		const parser = langMap[extension]
		if (parser) {
			html = window.Prism.highlight(children, parser, extension)
		}
		return (
			<div
				className={tmpl`${extension && `language-${extension}`} ${className}`}
				style={style}
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
		)
	}, [
		// ready, // Rerenders on ready; DOMContentLoaded
		className,
		style,
		extension,
		children,
	])

	return $children
})

export default Highlight
