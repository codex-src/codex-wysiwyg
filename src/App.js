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

const Code = ({ children }) => (
	<code className="px-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded">
		{children}
	</code>
)

const CodexEditor = ({
	header,
	paragraph,
	unstyled,
	em,
	strong,
	code,
	...props
}) => {

	// Maps block element types (strings) to renderable block
	// components.
	//
	// TODO: Change to useMemo? useMemo(() => { ... }, [])
	const elementMap = {
		header,
		paragraph,
	}

	// Maps inline element types (strings) to renderable
	// inline components.
	//
	// TODO: Change to useMemo? useMemo(() => { ... }, [])
	const inlineElementMap = {
		unstyled,
		em,
		strong,
		code,
	}

	// <p>
	//   Hello
	//   <code>
	//     <strong>
	//       <em>
	//         !
	//       </em>
	//     </strong>
	//   </code>
	// </p>

	const blocks = [
		{
			type: "header",
			key: "TODO:uuidv4()",
			text: `In Go, fmt.Println("Hello, world!") prints Hello, world!`,
			fields: [
				{
					type: "unstyled",
					offsetStart: 0,
					offsetEnd: 7,
				},
				{
					type: "code",
					offsetStart: 7,
					offsetEnd: 35,
				},
				{
					type: "unstyled",
					offsetStart: 35,
					offsetEnd: 43,
				},
				{
					type: "em",
					offsetStart: 36,
					offsetEnd: 42,
				},
				{
					type: "code",
					offsetStart: 43,
					offsetEnd: 56,
				},
			],
		},
	]

	// Returns whether an inline element field is nested.
	const fieldIsNested = (fieldA, fieldB) => {
		const ok = (
			fieldB.offsetStart >= fieldA.offsetStart &&
			fieldB.offsetEnd <= fieldA.offsetEnd
		)
		return ok
	}

	// Returns whether an inline element field is partially
	// nested.
	const fieldIsPartiallyNested = (fieldA, fieldB) => {
		const ok = (
			fieldB.offsetStart < fieldA.offsetEnd &&
			fieldB.offsetEnd > fieldA.offsetEnd
		)
		return ok
	}

	// Retursn whether an inline element field is nested or
	// partially nested.
	const fieldIsNestedOrPartiallyNested = (fieldA, fieldB) => {
		const ok = (
			fieldIsNested(fieldA, fieldB) ||
			fieldIsPartiallyNested(fieldA, fieldB)
		)
		return ok
	}

	// Parses an abstract block data structure to a renderable
	// React component.
	const parseBlock = block => {
		const children = []
		for (let x = 0; x < block.fields.length; x++) {
			if (x + 1 < block.fields.length && fieldIsNested(block.fields[x], block.fields[x + 1])) {
				const A = inlineElementMap[block.fields[x].type]
				const B = inlineElementMap[block.fields[x + 1].type]
				children.push((
					<A key={children.length}>
						{block.text.slice(block.fields[x].offsetStart,
							block.fields[x + 1].offsetStart)}
						<B>
							{block.text.slice(block.fields[x + 1].offsetStart,
								block.fields[x + 1].offsetEnd)}
						</B>
						{block.text.slice(block.fields[x + 1].offsetEnd,
							block.fields[x].offsetEnd)}
					</A>
				))
				x++
			} else if (x + 1 < block.fields.length && fieldIsPartiallyNested(block.fields[x], block.fields[x + 1])) {
				const A = inlineElementMap[block.fields[x].type]
				const B = inlineElementMap[block.fields[x + 1].type]
				children.push((
					<React.Fragment key={children.length}>
						<A key={children.length}>
							{block.text.slice(block.fields[x].offsetStart,
								block.fields[x + 1].offsetStart)}
							<B key={children.length}>
								{block.text.slice(block.fields[x + 1].offsetStart,
									block.fields[x].offsetEnd)}
							</B>
						</A>
						<B key={children.length}>
							{block.text.slice(block.fields[x].offsetEnd,
								block.fields[x + 1].offsetEnd)}
						</B>
					</React.Fragment>
				))
				x++
			} else {
				const A = inlineElementMap[block.fields[x].type]
				children.push((
					<A key={children.length}>
						{block.text.slice(block.fields[x].offsetStart,
							block.fields[x].offsetEnd)}
					</A>
				))
			}
		}
		const Block = elementMap[block.type]
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
		<div className="w-full max-w-3xl">
			<CodexEditor
				header={Header}
				paragraph={Paragraph}
				unstyled={Unstyled}
				em={Em}
				strong={Strong}
				code={Code}
			/>
		</div>
	</div>
)

export default App
