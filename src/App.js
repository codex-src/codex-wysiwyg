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
	fieldsAreContained,
	fieldsDoNotOverlap,
	fieldsPartiallyOverlap,
	fieldsTotallyOverlap,
} from "./fields"

// Returns doubly linked list to the most recent element.
//
// TODO: We can probably just use references to the most
// recent element and the host element -- I don’t see us
// needing *more* information
function mostRecentElement(element) {
	let ref = element
	let recent = {
		prev: null,
		ref,
		next: null,
	}
	while (typeof ref === "object" && "props" in ref && "children" in ref.props) {
		ref = Array.isArray(ref.props.children) ? ref.props.children[ref.props.children.length - 1]
			: ref.props.children
		recent.next = {
			prev: recent,
			ref,
			next: null,
		}
		recent = recent.next
	}
	return recent
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
		renderable.push(React.createElement(componentMap[T], {
			key: renderable.length,
			...props,
		}, toReact([props.children].flat(), componentMap)))
	}
	return renderable
}

// Parses inline elements from a VDOM node.
function parseInlineElements(node, componentMap) {
	// The parsed inline elements to be returned.
	const elements = []

	// Points to the most recent reference.
	const ref = null

	// Points to the most recent reference container.
	const container = elements

	for (let x = 0; x < node.fields.length; x++) {

		const fields = [!x ? null : node.fields[x - 1], node.fields[x]]

		if (fields[0] === null || fieldsDoNotOverlap(...fields)) {
			// console.log("fieldsDoNotOverlap")
			elements.push({
				type: fields[1].type,
				props: {
					children: node.text.slice(fields[1].offsetStart, fields[1].offsetEnd),
				},
			})
		} else if (fieldsPartiallyOverlap(...fields)) {
			// console.log("fieldsPartiallyOverlap")
			const recent = mostRecentElement(elements[elements.length - 1])
			const ref = recent.prev.ref
			ref.props.children = [
				node.text.slice(fields[0].offsetStart, fields[1].offsetStart),
				{
					type: fields[1].type,
					props: {
						children: node.text.slice(fields[1].offsetStart, fields[0].offsetEnd),
					},
				},
			]
			// TODO: Arrays are not actually supported...
			const arr = recent.prev.prev ? recent.prev.prev.ref : elements
			arr.push({
				type: fields[1].type,
				props: {
					children: node.text.slice(fields[0].offsetEnd, fields[1].offsetEnd),
				},
			})
		} else if (fieldsTotallyOverlap(...fields)) {
			// console.log("fieldsTotallyOverlap")
			const recent = mostRecentElement(elements[elements.length - 1])
			const ref = recent.prev.ref
			ref.props.children = {
				type: fields[1].type,
				props: {
					children: ref.props.children,
				},
			}
		} else if (fieldsAreContained(...fields)) {
			// ...
			const recent = mostRecentElement(elements[elements.length - 1])
			const ref = recent.prev.ref
			ref.props.children = []
			const lhs = node.text.slice(fields[0].offsetStart, fields[1].offsetStart)
			if (lhs) {
				ref.props.children.push(lhs)
			}
			const mid = node.text.slice(fields[1].offsetStart, fields[1].offsetEnd)
			if (mid) {
				ref.props.children.push({
					type: fields[1].type,
					props: {
						children: mid,
					},
				})
			}
			const rhs = node.text.slice(fields[1].offsetEnd, fields[0].offsetEnd)
			if (rhs) {
				ref.props.children.push(rhs)
			}
		}

	}

	// console.log(JSON.stringify(elements, null, "\t"))
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
			text: "abc-123-xyzabc",
			fields: [
				{
					type: "strong",
					offsetStart: 0,
					offsetEnd: 7,
				},
				{
					type: "em",
					offsetStart: 4,
					offsetEnd: 11,
				},
				{
					type: "code",
					offsetStart: 11,
					offsetEnd: 14,
				},
				{
					type: "strong",
					offsetStart: 12,
					offsetEnd: 13,
				},
				// {
				// 	type: "strike",
				// 	offsetStart: 11,
				// 	offsetEnd: 13,
				// },
			],
		},
	]

	return (
		<article>
			{nodes.map(({ type: T, ...each }) => {
				const elements = parseInlineElements(each, componentMap)
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

export default App
