import React from "react"

const Header = ({ children }) => (
	<h1 className="">
		{children || (
			<br />
		)}
	</h1>
)

const Paragraph = ({ children }) => (
	<p className="">
		{children || (
			<br />
		)}
	</p>
)

const Unstyled = ({ children }) => (
	children
)

const Em = ({ children }) => (
	<em className="">
		{children}
	</em>
)

const Strong = ({ children }) => (
	<strong className="">
		{children}
	</strong>
)

const CodexEditor = ({
	header,
	paragraph,
	unstyled,
	em,
	strong,
	...props
}) => {

	// Maps block element types (strings) to renderable block
	// components.
	//
	// TODO: Change to useMemo? useMemo(() => { ... }, [])
	const renderableBlockMap = {
		header,
		paragraph,
	}

	// Maps inline element types (strings) to renderable
	// inline components.
	//
	// TODO: Change to useMemo? useMemo(() => { ... }, [])
	const renderableInlineMap = {
		unstyled,
		em,
		strong,
	}

	const blocks = [
		{
			type: "header",
			key: "abc-123-xyz", // Change to UUID
			text: "Hello, world!",
			fields: [
				// TODO: Deprecate unstyled fields?
				{
					type: "unstyled",
					start: 0,
					length: 7,
				},
				{
					type: "strong",
					start: 7,
					length: 5,
				},
				{
					type: "em",
					start: 12,
					length: 1,
				},
			],
		},
	]

	// Parses an abstract block data structure to a renderable
	// React component.
	const parseBlock = block => {
		const children = []
		for (const field of block.fields) {
			const Inline = renderableInlineMap[field.type]
			children.push((
				<Inline key={children.length}>
					{block.text.slice(field.start, field.start + field.length)}
				</Inline>
			))
		}
		const Block = renderableBlockMap[block.type]
		return (
			<Block key={block.key}>
				{children}
			</Block>
		)
	}

	return (
		<article>
			{blocks.map(each => (
				parseBlock(each)
			))}
		</article>
	)
}

const App = () => (
	<CodexEditor
		header={Header}
		paragraph={Paragraph}
		unstyled={Unstyled}
		em={Em}
		strong={Strong}
	/>
)

export default App
