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
	<em className="bg-blue-50 rounded">
		{children}
	</em>
)

const Strong = ({ children }) => (
	<strong className="bg-blue-50 rounded">
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
			key: "TODO:uuidv4()",
			text: "Hello, how are you?",
			fields: [
				{
					type: "unstyled",
					offsetStart: 0,
					offsetEnd: 7,
				},
				{
					type: "strong",
					offsetStart: 7,
					offsetEnd: 15,
				},
				{
					type: "em",
					offsetStart: 11,
					offsetEnd: 18,
				},
				{
					type: "unstyled",
					offsetStart: 18,
					offsetEnd: 19,
				},
			],
		},
	]

	// Returns whether an inline element is nested.
	const elementIsNested = (elementA, elementB) => {
		const ok = (
			elementB.offsetStart < elementA.offsetEnd &&
			elementB.offsetEnd <= elementA.offsetEnd
		)
		return ok
	}

	// Returns whether an inline element is partially nested.
	const elementIsPartiallyNested = (elementA, elementB) => {
		const ok = (
			elementB.offsetStart < elementA.offsetEnd &&
			elementB.offsetEnd > elementA.offsetEnd
		)
		return ok
	}

	// <p>
	//   Hello,{" "}
	//   <strong>
	//     how{" }
	//     <em>
	//       are{" "}
	//     </em>
	//   </strong>
	//   <em>
	//     you
	//   </em>
	// </p>

	// Parses an abstract block data structure to a renderable
	// React component.
	const parseBlock = block => {
		const children = []
		for (let x = 0; x < block.fields.length; x++) {
			// Resolver for when the next element is nested in the
			// current element
			if (x + 1 < block.fields.length && elementIsNested(block.fields[x], block.fields[x + 1])) {
				const Current = renderableInlineMap[block.fields[x].type]
				const Next = renderableInlineMap[block.fields[x + 1].type]
				const beforeCollision = block.text.slice(block.fields[x].offsetStart, block.fields[x + 1].offsetStart)
				const collision = block.text.slice(block.fields[x + 1].offsetStart, block.fields[x].offsetEnd)
				children.push((
					<Current key={children.length}>
						{beforeCollision}
						<Next>
							{collision}
						</Next>
					</Current>
				))
				x++
			// Resolver for when the next element is partially
			// nested in the current element
			} else if (x + 1 < block.fields.length && elementIsPartiallyNested(block.fields[x], block.fields[x + 1])) {
				const Current = renderableInlineMap[block.fields[x].type]
				const Next = renderableInlineMap[block.fields[x + 1].type]
				const beforeCollision = block.text.slice(block.fields[x].offsetStart, block.fields[x + 1].offsetStart)
				const collision = block.text.slice(block.fields[x + 1].offsetStart, block.fields[x].offsetEnd)
				const afterCollision = block.text.slice(block.fields[x].offsetEnd, block.fields[x + 1].offsetEnd)
				children.push((
					<React.Fragment key={children.length}>
						<Current>
							{beforeCollision}
							<Next>
								{collision}
							</Next>
						</Current>
						<Next>
							{afterCollision}
						</Next>
					</React.Fragment>
				))
				x++
			} else {
				const Current = renderableInlineMap[block.fields[x].type]
				const noCollision = block.text.slice(block.fields[x].offsetStart, block.fields[x].offsetEnd)
				children.push((
					<Current key={children.length}>
						{noCollision}
					</Current>
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
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl text-xl">
			<CodexEditor
				header={Header}
				paragraph={Paragraph}
				unstyled={Unstyled}
				em={Em}
				strong={Strong}
			/>
		</div>
	</div>
)

export default App
