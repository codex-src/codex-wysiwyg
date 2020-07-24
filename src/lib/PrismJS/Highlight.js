import langMap from "lib/PrismJS/langMap"
import React from "react"
import Wrap from "lib/x/Wrap"

const Highlight = ({ className, style, extension, children }) => (
	React.useMemo(() => {
		let __html = children
		const parser = langMap[extension]
		if (parser) {
			__html = window.Prism.highlight(children, parser, extension)
		}
		// NOTE: Does not use semantic elements; <pre><code>.
		return (
			<Wrap className={extension && `language-${extension}`}>
				<div className={className} style={style} dangerouslySetInnerHTML={{
					__html,
				}} />
			</Wrap>
		)
	}, [
		className,
		style,
		extension,
		children,
	])
)

export default Highlight
