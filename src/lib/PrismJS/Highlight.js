import langMap from "lib/PrismJS/langMap"
import React from "react"
import tmpl from "lib/x/tmpl"

const Highlight = React.memo(({ className, style, extension, children }) => (
	React.useMemo(() => {
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
		className,
		style,
		extension,
		children,
	])
))

export default Highlight
