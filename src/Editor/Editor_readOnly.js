import Elements from "./components/Elements"
import React from "react"

// Renders a read-only editor.
const ReadOnlyEditor = ({ id, className, style, children }) => {
	const elements = React.useMemo(() => {
		// return parseMarkdown(children) // TODO
		return null
	}, [children])

	return (
		<article
			id={id}
			className={[
				"em-context",
				className,
			].filter(Boolean).join(" ")}
			style={style}
			data-type="root"
		>
			<Elements elements={elements} />
		</article>
	)
}

export default ReadOnlyEditor
