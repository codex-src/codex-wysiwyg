import langMap from "lib/PrismJS/langMap"
import React from "react"

const Highlight = ({ extension, children }) => (
	React.useMemo(() => {
		let __html = children
		const parser = langMap[extension]
		if (parser) {
			__html = window.Prism.highlight(children, parser, extension)
		}
		return (
			<div
				className={extension && `language-${extension}`}
				dangerouslySetInnerHTML={{
					__html,
				}}
			/>
		)
	}, [extension, children])
)

export default Highlight
