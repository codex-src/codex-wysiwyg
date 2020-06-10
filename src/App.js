import React from "react"
import uuidv4 from "uuid/v4"
import { NumberEnum } from "lib/Enums"

import {
	Anchor,
	Code,
	Emphasis,
	Header,
	Paragraph,
	Strikethrough,
	Strong,
} from "./components"

// Converts one component to a renderable React component.
function toReactOne(component, renderableMap, key = 0) {
	if (typeof component === "string") {
		return component
	}
	const { type: T, props } = component
	return React.createElement(renderableMap[T], {
		key,
		...props,
	}, toReact(props.children, renderableMap))
}

// Converts components to renderable React components.
function toReact(components, renderableMap) {
	if (!Array.isArray(components)) {
		return toReactOne(components, renderableMap)
	}
	const renderable = []
	for (const each of components) {
		renderable.push(toReactOne(each, renderableMap, renderable.length))
	}
	return renderable
}

// NOTE: Ordered by render precedence
const formatsEnum = new NumberEnum(
	"anchor",
	"code",
	"strikethrough",
	"strong",
	"emphasis",
)

const CodexEditor = ({
	components: {
		Header,
		Paragraph,
		Emphasis,
		Strong,
		Code,
		Strikethrough,
		Anchor,
	},
	...props
}) => {
	// Maps element types (strings) to renderable React
	// components.
	const renderableMap = React.useMemo(() => ({
		[formatsEnum.Header]: Header,
		[formatsEnum.Paragraph]: Paragraph,
		[formatsEnum.emphasis]: Emphasis,
		[formatsEnum.strong]: Strong,
		[formatsEnum.code]: Code,
		[formatsEnum.strikethrough]: Strikethrough,
		[formatsEnum.anchor]: Anchor,
	}), [
		Header,
		Paragraph,
		Emphasis,
		Strong,
		Code,
		Strikethrough,
		Anchor,
	])

	// // Creates a new array of sorted formats (for spans).
	// function newFormats(...formats) {
	// 	return formats.sort()
	// }

	// TODO: Move to useState or equivalent
	const nodes = [
		{
			type: Paragraph,
			key: uuidv4(),
			spans: [
				{
					data: "abc",
					formats: [formatsEnum.code],
				},
				{
					data: "def",
					formats: [formatsEnum.code, formatsEnum.emphasis],
				},
				{
					data: "ghi",
					formats: [formatsEnum.code],
				},
			],
		},
	]

	// // Returns whether a component has a type nested.
	// const componentHasType = (component, type) => {
	// 	let ref = component
	// 	while (ref && ref.type) {
	// 		if (ref.type === type) {
	// 			return ref
	// 		}
	// 		ref = ref.props.children
	// 	}
	// 	return null
	// }

	// // Returns an array of common types.
	// const commonTypes = (component, types) => {
	// 	const matches = []
	// 	for (const type of types) {
	// 		let ref = component
	// 		while (ref && ref.type) {
	// 			if (ref.type === type) {
	// 				matches.push(type)
	// 				break
	// 			}
	// 			ref = ref.props.children
	// 		}
	// 	}
	// 	return matches
	// }

	const toArray = value => {
		if (!Array.isArray(value)) {
			return [value]
		}
		return value
	}

	// // Merges VDOM (non-React) span components.
	// //
	// // -> emphasis
	// // 	-> strong
	// // -> emphasis
	// //
	// // <em>
	// // 	emphasis
	// // 	<strong>
	// // 		strong
	// // 	</strong>
	// // 	emphasis
	// // </em>
	// //
	// const mergeComponents = components => {
	// 	console.log(JSON.stringify(components, null, "\t"))
	// 	const merged = []
	// 	for (let x = 0; x < components.length; x++) {
	// 		if (!x || typeof components[x] === "string") {
	// 			merged.push(components[x])
	// 			continue
	// 		}
	// 		if (components[x - 1].type && (components[x - 1].type === components[x].type)) {
	// 			// / console.log(x, [...merged], components[x - 1].props.children)
	// 			merged.pop()
	// 			merged.push({
	// 				...components[x - 1],
	// 				props: {
	// 					children: [
	// 						...toArray(components[x - 1].props.children),
	// 						...toArray(components[x].props.children),
	// 					],
	// 				},
	// 			})
	// 			// merged.splice(merged.length - 1, 1, {
	// 			// 	...components[x - 1],
	// 			// 	props: {
	// 			// 		children: [
	// 			// 			components[x - 1].props.children,
	// 			// 			components[x].props.children,
	// 			// 		],
	// 			// 	},
	// 			// })
	// 			continue
	// 		}
	// 	}
	// 	console.log(JSON.stringify(merged, null, "\t"))
	// 	// for (let x = 0; x < components.length; x++) {
	// 	// 	if (!x || typeof components[x] === "string") {
	// 	// 		// No-op
	// 	// 		continue
	// 	// 	}
	// 	// 	if (components[x - 1].type === components[x].type) {
	// 	// 		components.splice(x - 1, 2, {
	// 	// 			...components[x - 1],
	// 	// 			props: {
	// 	// 				children: [
	// 	// 					components[x - 1].props.children,
	// 	// 					components[x].props.children,
	// 	// 				],
	// 	// 			}
	// 	// 		})
	// 	// 		x++
	// 	// 		console.log([...components], x)
	// 	// 		continue
	// 	// 	}
	// 	// 	// console.log(components[x]) // , componentHasType(components[x], 4))
	// 	// }
	// 	// // return merged // FIXME
	// }

	// Parses spans to VDOM (Non-React) component.
	const parseSpans = spans => {
		const components = []
		for (const each of spans) {
			if (typeof each === "string") {
				if (components.length && typeof components[components.length - 1] === "string") {
					components[components.length - 1] += each
					continue
				}
				components.push(each)
				continue
			}
			let formats = [...each.formats].sort()
			const component = {
				type: formats[0],
				props: {
					...each[formats[0]],
					children: null,
				},
			}
			let ref = component
			for (const format of formats.slice(1)) {
				ref.props.children = {
					type: format,
					props: {
						...each[format],
						children: null,
					},
				}
				ref = ref.props.children
			}
			ref.props.children = each.data
			components.push(component)
		}
		return components
	}

	return (
		<article>
			{nodes.map(({ type: T, key, spans }) => (
				React.createElement(T, {
					key,
				}, toReact(parseSpans(spans), renderableMap))
			))}
		</article>
	)
}

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<CodexEditor
				components={{
					Header,
					Paragraph,
					Emphasis,
					Strong,
					Code,
					Strikethrough,
					Anchor,
				}}
			/>
		</div>
	</div>
)

export default App
