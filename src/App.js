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

	// TODO: Move to useState or equivalent
	const nodes = [
		{
			type: Header,
			key: uuidv4(),
			spans: [
				{
					data: "Google",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://google.com",
					}
				},

				// {
				// 	data: "strong",
				// 	formats: [formatsEnum.strong],
				// },
				// {
				// 	data: "emphasis",
				// 	formats: [formatsEnum.strong, formatsEnum.emphasis],
				// },
				// {
				// 	data: "strong",
				// 	formats: [formatsEnum.strong],
				// },
			],
		},
	]

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
			const formats = [...each.formats].sort()
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
		console.log(JSON.stringify(components, null, "\t"))
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
