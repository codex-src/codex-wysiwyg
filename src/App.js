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
				{
					type: "unstyled",
					offsetStart: 0,
					offsetEnd: 7,
				},
				{
					type: "strong",
					offsetStart: 7,
					offsetEnd: 13,
				},
				{
					type: "em",
					offsetStart: 12,
					offsetEnd: 13,
				},
			],
		},
	]

	// Returns whether an inline element is nested.
	const elementIsNested = (elementA, elementB) => {
		const ok = (
			elementB.offsetStart >= elementA.offsetStart &&
			elementB.offsetEnd <= elementA.offsetEnd
		)
		return ok
	}

	// // Returns whether an inline element is partially nested.
	// const elementIsPartiallyNested = (elementA, elementB) => {
	// 	const ok = (
	// 		elementB.offsetStart <= elementA.offsetStart &&
	// 		elementB.offsetEnd > elementA.offsetStart
	// 	)
	// 	return ok
	// }

	// Parses an abstract block data structure to a renderable
	// React component.
	const parseBlock = block => {
		const children = []
		for (let x = 0; x < block.fields.length; x++) {
			if (x + 1 < block.fields.length && elementIsNested(block.fields[x], block.fields[x + 1])) {
				const Host = renderableInlineMap[block.fields[x].type]
				const Nested = renderableInlineMap[block.fields[x + 1].type]
				children.push((
					<Host key={children.length}>
						{block.text.slice(block.fields[x].offsetStart, block.fields[x + 1].offsetStart)}
						<Nested>
							{block.text.slice(block.fields[x + 1].offsetStart, block.fields[x].offsetEnd)}
						</Nested>
					</Host>
				))
				x++
			} else {
				const Host = renderableInlineMap[block.fields[x].type]
				children.push((
					<Host key={children.length}>
						{block.text.slice(block.fields[x].offsetStart, block.fields[x].offsetEnd)}
					</Host>
				))
			}
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
