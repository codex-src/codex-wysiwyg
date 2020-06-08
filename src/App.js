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
	<em className="!bg-blue-50 !rounded">
		{children}
	</em>
)

const Strong = ({ children }) => (
	<strong className="!bg-blue-50 !rounded">
		{children}
	</strong>
)

const Code = ({ children }) => (
	<code className="px-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded">
		{children}
	</code>
)

const Strike = ({ children }) => (
	<strike className="line-through text-gray-300">
		{children}
	</strike>
)

const CodexEditor = ({
	header,
	paragraph,
	unstyled,
	em,
	strong,
	code,
	strike,
	...props
}) => {

	// Maps block element types (strings) to renderable block
	// components.
	//
	// TODO: Change to useMemo? useMemo(() => { ... }, [])
	const elementMap = {
		header,
		paragraph,

		unstyled,
		em,
		strong,
		code,
		strike,
	}

	const blocks = [
		{
			type: "paragraph",
			key: "TODO:uuidv4()",
			text: "Hello, world!",
			fields: [
				{
					type: "em",
					offsetStart: 0,
					offsetEnd: 13,
				},
				{
					type: "strong",
					offsetStart: 0,
					offsetEnd: 13,
				},
				{
					type: "code",
					offsetStart: 0,
					offsetEnd: 13,
				},
				{
					type: "strike",
					offsetStart: 0,
					offsetEnd: 13,
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

	// Returns the deepest reference to "children".
	const deepestElement = element => {
		let lastRef = element
		let ref = lastRef.props.children
		while (typeof ref === "object" && "props" in ref && "children" in ref.props) {
			lastRef = ref
			ref = ref.props.children
		}
		return lastRef
	}

	// Prepares renderable React components.
	const toReact = components => {
		if (components === null || typeof components === "string") {
			return components
		}
		const renderable = []
		for (const each of components) {
			if (each === null || typeof each === "string") {
				renderable.push(each)
				continue
			}
			const { type: T, props } = each
			const Element = elementMap[T]
			renderable.push((
				<Element key={renderable.length} {...props}>
					{toReact([props.children])}
				</Element>
			))
		}
		return renderable
	}

	// Parses an abstract block data structure to a renderable
	// React component.
	const parseBlock = block => {
		const components = []
		for (let x = 0; x < block.fields.length; x++) {

			if (x && block.fields[x].startOffset === block.fields[x - 1].startOffset && block.fields[x].endOffset === block.fields[x - 1].endOffset) {
				const ref = deepestElement(components[components.length - 1])
				ref.props.children = {
					type: block.fields[x].type,
					props: {
						children: ref.props.children,
					},
				}
			} else {
				components.push({
					type: block.fields[x].type,
					props: {
						children: block.text.slice(
							block.fields[x].startOffset,
							block.fields[x].endOffset,
						),
					},
				})
			}

		}

		const Block = elementMap[block.type]
		return (
			<Block key={block.key}>
				{toReact(components)}
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
				strike={Strike}
			/>
		</div>
	</div>
)

// if (x + 1 < block.fields.length && fieldIsNested(block.fields[x], block.fields[x + 1])) {
// 	const A = elementMap[block.fields[x].type]
// 	const B = elementMap[block.fields[x + 1].type]
// 	children.push((
// 		<A key={children.length}>
// 			{block.text.slice(block.fields[x].offsetStart,
// 				block.fields[x + 1].offsetStart)}
// 			<B>
// 				{block.text.slice(block.fields[x + 1].offsetStart,
// 					block.fields[x + 1].offsetEnd)}
// 			</B>
// 			{block.text.slice(block.fields[x + 1].offsetEnd,
// 				block.fields[x].offsetEnd)}
// 		</A>
// 	))
// 	x++
// } else if (x + 1 < block.fields.length && fieldIsPartiallyNested(block.fields[x], block.fields[x + 1])) {
// 	const A = elementMap[block.fields[x].type]
// 	const B = elementMap[block.fields[x + 1].type]
// 	children.push((
// 		<React.Fragment key={children.length}>
// 			<A key={children.length}>
// 				{block.text.slice(block.fields[x].offsetStart,
// 					block.fields[x + 1].offsetStart)}
// 				<B key={children.length}>
// 					{block.text.slice(block.fields[x + 1].offsetStart,
// 						block.fields[x].offsetEnd)}
// 				</B>
// 			</A>
// 			<B key={children.length}>
// 				{block.text.slice(block.fields[x].offsetEnd,
// 					block.fields[x + 1].offsetEnd)}
// 			</B>
// 		</React.Fragment>
// 	))
// 	x++
// } else {
// 	const A = elementMap[block.fields[x].type]
// 	children.push((
// 		<A key={children.length}>
// 			{block.text.slice(block.fields[x].offsetStart,
// 				block.fields[x].offsetEnd)}
// 		</A>
// 	))
// }

export default App
