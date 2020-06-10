// import uuidv4 from "uuid/v4"
import React from "react"
import { StringEnum } from "lib/Enums"

import {
	Code,
	Emphasis,
	Strikethrough,
	Strong,
} from "./components"

// Converts components to renderable React components.
function toReact(components, componentMap) {
	if (typeof components === "string") {
		return components
	}
	const renderable = []
	for (const each of components) {
		if (typeof each === "string") {
			renderable.push(each)
			continue
		}
		const { type: T, props } = each
		renderable.push(React.createElement(componentMap[T], {
			key: renderable.length,
			...props,
		}, toReact(props.children, componentMap)))
	}
	return renderable
}

// TODO: Change to an ordered NumberEnum where smaller
// numbers take precedence?
const formatsEnum = new StringEnum(
	"strong",
	"emphasis",
	"strikethrough",
	"code",
	"anchor",
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
	const componentMap = React.useMemo(() => ({
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
		"Hello, world!",
		" ",
		"How are you?",
		{
			data: "Hello, ",
			formats: [formatsEnum.strong],
		},
		{
			data: "world",
			formats: [formatsEnum.strong], // , formatsEnum.emphasis],
		},
		{
			data: "!",
			formats: [formatsEnum.strong],
		},
	]

	// <article>
	// 	{nodes.map(({ type: T, ...each }) => {
	// 		const elements = parseInlineElements(each, componentMap)
	// 		return React.createElement(componentMap[T], {
	// 			key: each.key,
	// 		}, toReact(elements, componentMap))
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
			// FIXME
			if (!components.length || components[components.length - 1].type !== each.formats[0]) {
				components.push({
					type: each.formats[0],
					props: {
						children: each.data,
					},
				})
				continue
			}
			components[components.length - 1].props.children += each.data
		}

		// console.log(components)
		return components
	}

	return (
		<p>
			{toReact(parseSpans(spans), componentMap) || (
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
