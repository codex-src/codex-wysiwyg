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
		const { type: T, props } = each
		const Element = componentMap[T]
		// TODO: Argument components must be an array; uses
		// [...] for now
		renderable.push(React.createElement(componentMap[T], {
			key: renderable.length,
			...props,
		}, toReact([props.children], componentMap)))
	}
	return renderable
}

// Parses an element from a VDOM node.
function parseElements(nodes, componentMap) {
	const components = []
	for (let x = 0; x < nodes.fields.length; x++) {

		//		// if (x && nodes.fields[x].offsetStart === nodes.fields[x - 1].offsetStart && nodes.fields[x].offsetEnd === nodes.fields[x - 1].offsetEnd) {
		//		// 	const ref = deepestElement(components[components.length - 1])
		//		// 	ref.props.children = {
		//		// 		type: nodes.fields[x].type,
		//		// 		props: {
		//		// 			children: ref.props.children,
		//		// 		},
		//		// 	}
		//
		//		if (x && fieldIsNested(nodes.fields[x - 1], nodes.fields[x])) {
		//			// TODO: Three cases: slice LHS, no slice, slice RHS
		//			const ref = deepestElement(components[components.length - 1])
		//			const offsetStart = nodes.fields[x].offsetStart - nodes.fields[x - 1].offsetStart
		//			const offsetEnd = offsetStart + nodes.fields[x].offsetEnd - nodes.fields[x].offsetStart
		//			console.log(
		//				ref.props.children.slice(0, offsetStart),
		//				ref.props.children.slice(offsetStart, offsetEnd),
		//				ref.props.children.slice(offsetEnd),
		//			)
		//			ref.props.children = {
		//				type: nodes.fields[x].type,
		//				props: {
		//					children: ref.props.children,
		//				},
		//			}
		//
		//			// const A = componentMap[nodes.fields[x].type]
		//			// const B = componentMap[nodes.fields[x + 1].type]
		//			// children.push((
		//			// 	<A key={children.length}>
		//			// 		{nodes.text.slice(nodes.fields[x].offsetStart,
		//			// 			nodes.fields[x + 1].offsetStart)}
		//			// 		<B>
		//			// 			{nodes.text.slice(nodes.fields[x + 1].offsetStart,
		//			// 				nodes.fields[x + 1].offsetEnd)}
		//			// 		</B>
		//			// 		{nodes.text.slice(nodes.fields[x + 1].offsetEnd,
		//			// 			nodes.fields[x].offsetEnd)}
		//			// 	</A>
		//			// ))
		//			// x++
		//
		//		// } else if (x && fieldIsPartiallyNested(nodes.fields[x], nodes.fields[x - 1])) {
		//			// ...
		//		} else {
		//			components.push({
		//				type: nodes.fields[x].type,
		//				props: {
		//					children: nodes.text.slice(nodes.fields[x].offsetStart, nodes.fields[x].offsetEnd),
		//				},
		//			})
		//		}
		//
		//		// if (x + 1 < nodes.fields.length && fieldIsNested(nodes.fields[x], nodes.fields[x + 1])) {
		//		// 	const A = componentMap[nodes.fields[x].type]
		//		// 	const B = componentMap[nodes.fields[x + 1].type]
		//		// 	children.push((
		//		// 		<A key={children.length}>
		//		// 			{nodes.text.slice(nodes.fields[x].offsetStart,
		//		// 				nodes.fields[x + 1].offsetStart)}
		//		// 			<B>
		//		// 				{nodes.text.slice(nodes.fields[x + 1].offsetStart,
		//		// 					nodes.fields[x + 1].offsetEnd)}
		//		// 			</B>
		//		// 			{nodes.text.slice(nodes.fields[x + 1].offsetEnd,
		//		// 				nodes.fields[x].offsetEnd)}
		//		// 		</A>
		//		// 	))
		//		// 	x++
		//		// } else if (x + 1 < nodes.fields.length && fieldIsPartiallyNested(nodes.fields[x], nodes.fields[x + 1])) {
		//		// 	const A = componentMap[nodes.fields[x].type]
		//		// 	const B = componentMap[nodes.fields[x + 1].type]
		//		// 	children.push((
		//		// 		<React.Fragment key={children.length}>
		//		// 			<A key={children.length}>
		//		// 				{nodes.text.slice(nodes.fields[x].offsetStart,
		//		// 					nodes.fields[x + 1].offsetStart)}
		//		// 				<B key={children.length}>
		//		// 					{nodes.text.slice(nodes.fields[x + 1].offsetStart,
		//		// 						nodes.fields[x].offsetEnd)}
		//		// 				</B>
		//		// 			</A>
		//		// 			<B key={children.length}>
		//		// 				{nodes.text.slice(nodes.fields[x].offsetEnd,
		//		// 					nodes.fields[x + 1].offsetEnd)}
		//		// 			</B>
		//		// 		</React.Fragment>
		//		// 	))
		//		// 	x++
		//		// } else {
		//		// 	const A = componentMap[nodes.fields[x].type]
		//		// 	children.push((
		//		// 		<A key={children.length}>
		//		// 			{nodes.text.slice(nodes.fields[x].offsetStart,
		//		// 				nodes.fields[x].offsetEnd)}
		//		// 		</A>
		//		// 	))
		//		// }

	}

	return components
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
