import React from "react"
import uuidv4 from "uuid/v4"

import {
	Code,
	Em,
	Header,
	Paragraph,
	Strike,
	Strong,
	Unstyled,
} from "./components"

import {
	fieldIsContained,
	fieldIsContainedLHS,
	fieldIsContainedRHS,
	fieldsArePartiallyIntersected,
	fieldsAreTotallyIntersected,
	fieldsDoNotIntersect,
} from "./fields"

// Returns the deepest reference to props.children.
function deepestElement(element) {
	let lastRef = element
	let ref = lastRef.props.children
	while (typeof ref === "object" && "props" in ref && "children" in ref.props) {
		lastRef = ref
		ref = ref.props.children
	}
	return lastRef
}

// Converts elements to renderable React components.
//
// TODO: Deprecate ... null || ... "string" case because of
// <Unstyled>?
function toReact(components, componentMap) {
	if (components === null || typeof components === "string") {
		return components
	}
	const renderable = []
	for (const each of components) {
		if (each === null || typeof each === "string") {
			renderable.push(each)
			continue
		}
		// TODO: Argument components must be an array; uses
		// [props.children] for now
		const { type: T, props } = each
		renderable.push(React.createElement(componentMap[T], {
			key: renderable.length,
			...props,
		}, toReact([props.children], componentMap)))
	}
	return renderable
}

// Parses an element from a VDOM node.
function parseElements(node, componentMap) {
	const elements = []
	for (let x = 0; x < node.fields.length; x++) {

		const min = Math.max(x - 1, 0)
		const max = Math.min(x + 1, node.fields.length)

		const fields = node.fields.slice(min, max)
		if (fields.length < 1 || fields.length > 2) {
			throw new Error(`parseElements: too few or too many fields; length=${fields.length}`)
		}

		if (fields.length === 1 || fieldsDoNotIntersect(fields[0], fields[1])) {
			const field = fields[fields.length - 1]
			elements.push({
				...field,
				props: {
					children: node.text.slice(field.offsetStart, field.offsetEnd),
				},
			})
		} else {
			// console.log(fields)
			const [, field] = fields
			switch (true) {
			case fieldsArePartiallyIntersected(...fields):
				console.log("fieldsArePartiallyIntersected")
				break
			case fieldsAreTotallyIntersected(...fields):
				console.log("fieldsAreTotallyIntersected")

				const ref = deepestElement(elements[elements.length - 1])
				ref.props.children = {
					...field,
					props: {
						children: ref.props.children,
					},
				}

				break
			case fieldIsContainedRHS(...fields):
				console.log("fieldIsContainedRHS")
				break
			case fieldIsContained(...fields):
				console.log("fieldIsContained")
				break
			case fieldIsContainedLHS(...fields):
				console.log("fieldIsContainedLHS")
				break
			default:
				// No-op
				break
			}
		}

		// if (x + 1 < nodes.fields.length && fieldIsNested(nodes.fields[x], nodes.fields[x + 1])) {
		// 	const A = componentMap[nodes.fields[x].type]
		// 	const B = componentMap[nodes.fields[x + 1].type]
		// 	children.push((
		// 		<A key={children.length}>
		// 			{nodes.text.slice(nodes.fields[x].offsetStart,
		// 				nodes.fields[x + 1].offsetStart)}
		// 			<B>
		// 				{nodes.text.slice(nodes.fields[x + 1].offsetStart,
		// 					nodes.fields[x + 1].offsetEnd)}
		// 			</B>
		// 			{nodes.text.slice(nodes.fields[x + 1].offsetEnd,
		// 				nodes.fields[x].offsetEnd)}
		// 		</A>
		// 	))
		// 	x++
		// } else if (x + 1 < nodes.fields.length && fieldIsPartiallyNested(nodes.fields[x], nodes.fields[x + 1])) {
		// 	const A = componentMap[nodes.fields[x].type]
		// 	const B = componentMap[nodes.fields[x + 1].type]
		// 	children.push((
		// 		<React.Fragment key={children.length}>
		// 			<A key={children.length}>
		// 				{nodes.text.slice(nodes.fields[x].offsetStart,
		// 					nodes.fields[x + 1].offsetStart)}
		// 				<B key={children.length}>
		// 					{nodes.text.slice(nodes.fields[x + 1].offsetStart,
		// 						nodes.fields[x].offsetEnd)}
		// 				</B>
		// 			</A>
		// 			<B key={children.length}>
		// 				{nodes.text.slice(nodes.fields[x].offsetEnd,
		// 					nodes.fields[x + 1].offsetEnd)}
		// 			</B>
		// 		</React.Fragment>
		// 	))
		// 	x++
		// } else {
		// 	const A = componentMap[nodes.fields[x].type]
		// 	children.push((
		// 		<A key={children.length}>
		// 			{nodes.text.slice(nodes.fields[x].offsetStart,
		// 				nodes.fields[x].offsetEnd)}
		// 		</A>
		// 	))
		// }

	}

	return elements
}

const CodexEditor = ({
	components: {
		header,
		paragraph,
		unstyled,
		em,
		strong,
		code,
		strike,
	},
	...props
}) => {
	// Maps element types (strings) to renderable React
	// components.
	const componentMap = React.useMemo(() => ({
		header,
		paragraph,
		unstyled,
		em,
		strong,
		code,
		strike,
	}), [
		header,
		paragraph,
		unstyled,
		em,
		strong,
		code,
		strike,
	])

	// TODO: Move to useState or equivalent
	const nodes = [
		{
			type: "paragraph",
			key: uuidv4(),
			text: "Hello, world! How are you?",
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
				{
					type: "unstyled",
					offsetStart: 13,
					offsetEnd: 26,
				},
				{
					type: "em",
					offsetStart: 18,
					offsetEnd: 21,
				},
			],
		},
	]

	return (
		<article>
			{nodes.map(({ type: T, ...each }) => {
				const elements = parseElements(each, componentMap)
				return React.createElement(componentMap[T], {
					key: each.key,
				}, toReact(elements, componentMap))
			})}
		</article>
	)
}

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<CodexEditor
				components={{
					header: Header,
					paragraph: Paragraph,
					unstyled: Unstyled,
					em: Em,
					strong: Strong,
					code: Code,
					strike: Strike,
				}}
			/>
		</div>
	</div>
)

export default App
