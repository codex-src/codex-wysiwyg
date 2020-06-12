import ascendToIDElement from "./ascend"
import React from "react"
import ReactDOM from "react-dom"
import readSpans from "./readSpans"
import toReact from "./toReact"
import useEditor from "./useEditor"
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

import {
	computeCursor,
	computeRange,
} from "./cursor"

// Computes a type map and array of types for a component.
function getTypeInfo(component) {
	const types = []
	const typeMap = {}
	if (typeof component === "string") {
		return [types, typeMap]
	}
	let ref = component.type !== undefined && // NOTE: "type" can be 0
		component
	while (ref) {
		types.push(ref.type)
		typeMap[ref.type] = ref
		ref = ref.props.children.type !== undefined && // NOTE: "type" can be 0
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
			typeMap1[type].props.typePos = !typeMap1[type].props.typePos ? "at-start" : "at-center"
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

const ReactRenderer = ({ state, dispatch, renderableMap }) => (
	state.elements.map(({ type: T, spans, ...props }) => (
		React.createElement(T, {
			key: props.uuid,
			...props,
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

	// Maps types to renderable React components.
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
	const pointerIsDownRef = React.useRef(false)

	const [state, dispatch] = useEditor([
		{
			type: Paragraph,
			uuid: uuidv4(),
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
	])

	React.useLayoutEffect(
		React.useCallback(() => {
			const selection = document.getSelection()
			if (selection && selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(
				<ReactRenderer
					state={state}
					dispatch={dispatch}
					renderableMap={renderableMap}
				/>,
				ref.current,
				() => {
					if (!state.focused) {
						// No-op
						return
					}
					const { container, offset } = computeRange(state.startCursor)
					const range = document.createRange()
					range.setStart(container, offset)
					range.collapse()
					// selection.removeAllRanges()
					selection.addRange(range)
				},
			)
		}, [state, dispatch, renderableMap]),
		[state.elements],
	)

	return (
		<div>
			<article

				ref={ref}

				className="whitespace-pre-wrap focus:outline-none"

				contentEditable
				suppressContentEditableWarning

				onFocus={dispatch.focus}

				onBlur={dispatch.blur}

				onSelect={() => {
					const selection = document.getSelection()
					if (!selection || !selection.rangeCount) {
						// No-op
						return
					}
					const range = selection.getRangeAt(0)
					const startCursor = computeCursor(ascendToIDElement(range.startContainer), { container: range.startContainer, offset: range.startOffset })
					let endCursor = startCursor
					if (!range.collapsed) {
						endCursor = computeCursor(ascendToIDElement(range.endContainer), { container: range.endContainer, offset: range.endOffset })
					}
					dispatch.select(startCursor, endCursor)
				}}

				onPointerDown={() => {
					pointerIsDownRef.current = true
				}}

				onPointerMove={() => {
					if (!state.focused || !pointerIsDownRef.current) {
						pointerIsDownRef.current = false
						return
					}
					const selection = document.getSelection()
					if (!selection || !selection.rangeCount) {
						// No-op
						return
					}
					const range = selection.getRangeAt(0)
					const startCursor = computeCursor(ascendToIDElement(range.startContainer), { container: range.startContainer, offset: range.startOffset })
					let endCursor = startCursor
					if (!range.collapsed) {
						endCursor = computeCursor(ascendToIDElement(range.endContainer), { container: range.endContainer, offset: range.endOffset })
					}
					dispatch.select(startCursor, endCursor)
				}}

				onPointerUp={() => {
					pointerIsDownRef.current = false
				}}

				onInput={() => {
					// TODO
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
