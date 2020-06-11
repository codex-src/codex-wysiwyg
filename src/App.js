import React from "react"
import readSpans from "./readSpans"
import uuidv4 from "uuid/v4"

import {
	Anchor,
	Code,
	Emphasis,
	Header,
	Paragraph,
	Strikethrough,
	Strong,
} from "./components"

import {
	formatsEnum,
	formatsEnumMap,
} from "./formatsEnum"

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
	for (const component of components) {
		renderable.push(toReactOne(component, renderableMap, renderable.length))
	}
	return renderable
}

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
	const elements = [
		{
			type: Paragraph,
			key: uuidv4(),
			spans: [
				{
					data: "Hey, ",
					formats: [formatsEnum.strong],
				},
				{
					data: "Russ",
					formats: [formatsEnum.strong, formatsEnum.emphasis],
				},
				{
					data: "!",
					formats: [formatsEnum.strong],
				},
				" I’m making some ",
				{
					data: "progress",
					formats: [formatsEnum.code],
				},
				" on making a ",
				{
					data: "WYSIWYG",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://google.com",
					},
				},
				" editor.",
			],
		},
	]

	// Computes a type map and array of types for a component.
	//
	// TODO
	const getTypeInfo = component => {
		const typeMap = {}
		const types = []
		if (typeof component === "string") {
			return [typeMap, types]
		}
		// NOTE: Uses ref.type !== undefined because formatsEnum
		// resolves to numbers (zero-based)
		let ref = component // TODO: Change condition to let ref = component && component.type !== undefined?
		while (ref && ref.type !== undefined) {
			typeMap[ref.type] = ref
			types.push(ref.type)
			ref = ref.props.children
		}
		return [typeMap, types]
	}

	// Decorates components; sets component.typePos to
	// "at-start", "at-center", or "at-end" for common types.
	//
	// TODO: Merge components for user-exported HTML
	const decorate = components => {
		for (let x = 0; x < components.length; x++) {
			if (!x || typeof components[x] === "string") {
				// No-op
				continue
			}
			const [typeMap1, types1] = getTypeInfo(components[x - 1])
			const [typeMap2, types2] = getTypeInfo(components[x])
			const common = types1.filter(a => types2.some(b => a === b))
			for (const type of common) {
				typeMap1[type].props.typePos = !typeMap1[type].props.typePos ? "at-start" : "at-center"
				typeMap2[type].props.typePos = "at-end"
			}
		}
	}

	// Parses spans to VDOM (non-React) components.
	const parseSpans = spans => {
		const components = []
		for (const span of spans) {
			if (typeof span === "string") {
				if (components.length && typeof components[components.length - 1] === "string") {
					components[components.length - 1] += span
					continue
				}
				components.push(span)
				continue
			}
			const formats = [...span.formats].sort()
			const component = {
				type: formats[0],
				props: {
					...span[formats[0]],
					children: null,
				},
			}
			let ref = component
			for (const format of formats.slice(1)) {
				ref.props.children = {
					type: format,
					props: {
						...span[format],
						children: null,
					},
				}
				ref = ref.props.children
			}
			ref.props.children = span.data
			components.push(component)
		}
		decorate(components)
		console.log(JSON.stringify(components, null, "\t"))
		return components
	}

	const ref = React.useRef(null)

	// // Reads a DOM node (element or text node); mocks
	// // element.textContent.
	// const readDOMNode = domNode => {
	// 	let data = ""
	// 	const recurse = on => {
	// 		if (on.nodeType === Node.TEXT_NODE) {
	// 			data += on.nodeValue
	// 			return
	// 		}
	// 		for (const each of on.childNodes) {
	// 			recurse(each)
	// 			const next = each.nextElementSibling
	// 			// if (next && isDocumentNode(next)) {
	// 			// 	data += "\n"
	// 			// }
	// 		}
	// 	}
	// 	recurse(domNode)
	// 	return data
	// }

	React.useEffect(() => {
		console.log(readSpans(ref.current.children[0]))
	}, [])

	return (
		<article
			ref={ref}
			className="whitespace-pre-wrap focus:outline-none"
			contentEditable
			suppressContentEditableWarning

			onInput={() => {
				// ...
			}}
		>
			{elements.map(({ type: T, key, spans }) => (
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
