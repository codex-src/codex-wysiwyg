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
					formats: [formatsEnum.code, formatsEnum.anchor],
				},
				{
					data: "def",
					formats: [formatsEnum.code, formatsEnum.emphasis],
				},				{
					data: "def",
					formats: [formatsEnum.code, formatsEnum.strong],
				},				{
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

	// Computes a type map and array of types for a component.
	const computeTypeInfo = component => {
		const typeMap = {}
		const types = []
		if (typeof component === "string") {
			return [typeMap, types]
		}
		// NOTE: Uses ref.type !== undefined because formatsEnum
		// resolves to numbers (zero-based)
		let ref = component
		while (ref && ref.type !== undefined) {
			typeMap[ref.type] = ref
			types.push(ref.type)
			ref = ref.props.children
		}
		return [typeMap, types]
	}

	// Decorates components; sets component.pos to "at-start",
	// "at-center", or "at-end".
	const decorate = components => {
		for (let x = 0; x < components.length; x++) {
			if (!x || typeof components[x] === "string") {
				// No-op
				continue
			}
			const [typeMap1, types1] = computeTypeInfo(components[x - 1])
			const [typeMap2, types2] = computeTypeInfo(components[x])
			const common = types1.filter(a => types2.some(b => a === b))

			console.log(x, types1, types2, components[x - 1])
			for (const type of common) {
				typeMap1[type].props.pos = !typeMap1[type].props.pos ? "at-start" : "at-center"
				typeMap2[type].props.pos = "at-end"
			}
		}
	}

	// Parses spans to VDOM (non-React) components.
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
		decorate(components)
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
