import ClassName from "lib/x/ClassName"
import langMap from "lib/PrismJS/langMap"
import React from "react"

const Highlight = ({ className, style, extension, children }) => (
	React.useMemo(() => {
		let __html = children
		const parser = langMap[extension]
		if (parser) {
			__html = window.Prism.highlight(children, parser, extension)
		}
		// NOTE: Does not use semantic elements; <pre><code>.
		return (
			<ClassName className={extension && `language-${extension}`}>
				<div className={className} style={style} dangerouslySetInnerHTML={{
					__html,
				}} />
			</ClassName>
		)
	}, [
		className,
		style,
		extension,
		children,
	])
)

export default Highlight
