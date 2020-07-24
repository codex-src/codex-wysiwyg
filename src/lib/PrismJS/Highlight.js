import langMap from "lib/PrismJS/langMap"
import React from "react"
import tmpl from "lib/x/tmpl"

// ...{ ...{ ...children.props, className: undefined, style: undefined }, ...props },

const Wrap = ({ className, style, children, ...props }) => (
	React.cloneElement(children, {
		className: tmpl`${children.props.className} ${className}`,
		style: { ...children.props.style, ...style },
		...props,
	})
)

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
