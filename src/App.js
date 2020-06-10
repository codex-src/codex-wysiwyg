// import uuidv4 from "uuid/v4"
import React from "react"
import { NumberEnum } from "lib/Enums"

import {
	Code,
	Emphasis,
	Strikethrough,
	Strong,
} from "./components"

// Converts a component to a renderable React component
function toReactEach(component, renderableMap, key = 0) {
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
		return toReactEach(components, renderableMap)
	}
	const renderable = []
	for (const each of components) {
		renderable.push(toReactEach(each, renderableMap, components.length))
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
		Emphasis,
		Strong,
		Code,
		Strikethrough,
	},
	...props
}) => {
	// Maps element types (strings) to renderable React
	// components.
	const renderableMap = React.useMemo(() => ({
		[formatsEnum.emphasis]: Emphasis,
		[formatsEnum.strong]: Strong,
		[formatsEnum.code]: Code,
		[formatsEnum.strikethrough]: Strikethrough,
	}), [
		Emphasis,
		Strong,
		Code,
		Strikethrough,
	])

	// TODO: Move to useState or equivalent
	const spans = [
		{
			data: "Hello!",
			formats: [formatsEnum.strong, formatsEnum.emphasis]
		},
	]

	// <article>
	// 	{nodes.map(({ type: T, ...each }) => {
	// 		const elements = parseInlineElements(each, renderableMap)
	// 		return React.createElement(renderableMap[T], {
	// 			key: each.key,
	// 		}, toReact(elements, renderableMap))
	// 	})}
	// </article>

	// **bold_italics_**
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

			let component = {
				type: each.formats[0],
				props: {
					children: null,
				}
			}
			let ref = component
			for (const format of each.formats.slice(1)) {
				ref.props.children = {
					type: format,
					props: {
						children: null,
					}
				}
				ref = ref.props.children
			}
			ref.props.children = each.data
			// console.log(JSON.stringify(component, null, "\t"))

			components.push(component)

			// components.push({
			// 	type: each.formats[0],
			// 	props: {
			// 		children: each.data,
			// 	},
			// })

			// if (!components.length || components[components.length - 1].type !== each.formats[0]) {
			// 	components.push({
			// 		type: each.formats[0],
			// 		props: {
			// 			children: each.data,
			// 		},
			// 	})
			// 	continue
			// }
			// components[components.length - 1].props.children += each.data

		}

		// console.log(components)
		return components
	}

	return (
		<p>
			{toReact(parseSpans(spans), renderableMap) || (
				<br />
			)}
		</p>
	)
}

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<CodexEditor
				components={{
					Emphasis,
					Strong,
					Code,
					Strikethrough,
				}}
			/>
		</div>
	</div>
)

export default App
