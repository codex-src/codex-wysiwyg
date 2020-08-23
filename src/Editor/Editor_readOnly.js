import Elements from "./components/Elements"
import React from "react"

// Renders a read-only editor. Accepts id, className, style,
// and *markdown or *children as props.
//
// <CodexReadOnlyEditor markdown={`...`} />
//
// <CodexReadOnlyEditor>
//   {markdown}
// </CodexReadOnlyEditor>
//
const ReadOnlyEditor = ({ id, className, style, markdown, children }) => {

	// Throws on bad markdown or children.
	const elements = React.useMemo(() => {
		if ((markdown === undefined && children === undefined) || (markdown !== undefined && children !== undefined)) {
			throw new Error("CodexReadOnlyEditor: use <ReadOnlyEditor markdown={`...`}> or <ReadOnlyEditor>{markdown}</ReadOnlyEditor>")
		}
		// return parseMarkdown(children) // TODO
		return null
	}, [markdown, children])

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
