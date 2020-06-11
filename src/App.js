import React from "react"
import ReactDOM from "react-dom"
import readSpans from "./readSpans"
import toReact from "./toReact"
import uuidv4 from "uuid/v4"
import { formatsEnum } from "./formatsEnum"

import {
	Anchor,
	Code,
	Emphasis,
	Header,
	Paragraph,
	Strikethrough,
	Strong,
} from "./components"

// Computes a type map and array of types for a component.
function getTypeInfo(component) {
	const types = []
	const typeMap = {}
	if (typeof component === "string") {
		return [types, typeMap]
	}
	let ref = component.type !== undefined && // NOTE: Guard undefined
			component
	while (ref) {
		types.push(ref.type)
		typeMap[ref.type] = ref
		ref = ref.props.children.type !== undefined &&  // NOTE: Guard undefined
				ref.props.children
	}
	return [types, typeMap]
}

// Decorates components; sets component.typePos to
// "at-start", "at-center", or "at-end" for common types.
function decorate(components) {
	for (let x = 0; x < components.length; x++) {
		if (!x || typeof components[x] === "string") {
			// No-op
			continue
		}
		const [types1, typeMap1] = getTypeInfo(components[x - 1])
		const [types2, typeMap2] = getTypeInfo(components[x])
		const common = types1.filter(a => types2.some(b => a === b))
		for (const type of common) {
			typeMap1[type].props.typePos =
					!typeMap1[type].props.typePos ? "at-start" : "at-center"
			typeMap2[type].props.typePos = "at-end"
		}
	}
}

// Parses spans to VDOM (non-React) components.
function parseSpans(spans) {
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
		// TODO: Deprecate?
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
		ref.props.children = span.content
		components.push(component)
	}
	decorate(components)
	return components
}

const ReactRenderer = ({ state, setState, renderableMap }) => (
	state.elements.map(({ type: T, key, spans }) => (
		React.createElement(T, {
			key,
		}, toReact(parseSpans(spans), renderableMap))
	))
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
	// Maps types (strings) to renderable React elements.
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
	const ref = React.useRef(null)

	const [state, setState] = React.useState(() => ({
		focused: false,
		startCursor: {
			element: 0,
			character: 0,
		},
		endCursor: {
			element: 0,
			character: 0,
		},
		elements: [
			{
				type: Paragraph,
				key: uuidv4(),
				spans: [
					{
						content: "Hey, ",
						formats: [formatsEnum.strong],
					},
					{
						content: "Russ",
						formats: [formatsEnum.strong, formatsEnum.emphasis],
					},
					{
						content: "!",
						formats: [formatsEnum.strong],
					},
					" I’m making some ",
					{
						content: "progress",
						formats: [formatsEnum.code],
					},
					" on making a ",
					{
						content: "WYSIWYG",
						formats: [formatsEnum.anchor],
						[formatsEnum.anchor]: {
							href: "https://google.com",
						},
					},
					" editor.",
				],
			},
		],
	}))

	React.useLayoutEffect(
		React.useCallback(() => {
			const selection = document.getSelection()
			if (selection && selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(
				<ReactRenderer
					state={state}
					setState={setState}
					renderableMap={renderableMap}
				/>,
				ref.current,
				() => {
					if (!state.focused) {
						// No-op
						return
					}

					let container = ref.current.children[0].childNodes[0]
					let offset = state.startCursor.character

					// Iterate to container and offset:
					while (container && offset) {
						if (offset - container.textContent.length <= 0) {
							// No-op
							break
						}
						offset -= container.textContent.length
						container = container.nextSibling
					}

					// Iterate to text node:
					while (container.nodeType === Node.ELEMENT_NODE && container.childNodes.length) {
						container = container.childNodes[container.childNodes.length - 1]
					}

					console.log(container, offset)

					const range = document.createRange()
					range.setStart(container, offset)
					range.collapse()
					// selection.removeAllRanges()
					selection.addRange(range)

				},
			)
		}, [state, setState, renderableMap]),
		[state.elements],
	)

	return (
		<div>
			<article
				ref={ref}
				className="whitespace-pre-wrap focus:outline-none"
				contentEditable
				suppressContentEditableWarning

				onFocus={() => {
					setState({
						...state,
						focused: true,
					})
				}}
				onBlur={() => {
					setState({
						...state,
						focused: false,
					})
				}}
				onSelect={() => {
					const selection = document.getSelection()
					if (!selection || !selection.rangeCount) {
						// No-op
						return
					}

					// Computes a cursor from an element and range
					// container and offset.
					const computeCursor = (element, { container, offset }) => {
						const cursor = {
							element: 0,
							character: 0,
						}
						const recurse = on => {
							if (on === container) {
								cursor.character += offset
								return true
							}
							for (const domNode of on.childNodes) {
								if (recurse(domNode)) {
									return true
								}
								if (domNode.nodeType === Node.TEXT_NODE) {
									cursor.character += domNode.textContent.length
								}
								// const next = each.nextElementSibling
								// if (next && isDocumentNode(next)) {
								// 	Object.assign(pos, {
								// 		x: 0,
								// 		y: pos.y + 1,
								// 		pos: pos.pos + 1,
								// 	})
								// }
							}
							return false
						}
						recurse(element)
						return cursor
					}

					const range = selection.getRangeAt(0)
					const startCursor = computeCursor(ref.current.children[0], { container: range.startContainer, offset: range.startOffset })
					let endCursor = { ...startCursor }
					if (!range.collapsed) {
						endCursor = computeCursor(ref.current.children[0], { container: range.endContainer, offset: range.endOffset })
					}

					setState({
						...state,
						startCursor,
						endCursor,
					})

				}}

				onInput={() => {
					const spans = readSpans(ref.current.children[0])
					setState({
						...state,
						startCursor: {
							...state.startCursor,
							character: state.startCursor.character + 1,
						},
						endCursors: {
							...state.startCursor,
							character: state.startCursor.character + 1,
						},
						elements: [
							{
								...state.elements[0],
								key: uuidv4(),
								spans,
							},
						],
					})
				}}
			/>
			<div className="mt-6 whitespace-pre font-mono text-xs leading-tight" style={{ tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</div>
		</div>
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
