import computeCursors from "./cursor"
import computeRange from "./range"
import detectKeyDownType from "./detect"
import keyDownTypesEnum from "./keyDownTypesEnum"
import noopTextContent from "./noopTextContent"
import React from "react"
import ReactDOM from "react-dom"
import readSpans from "./spans"
import toReact from "./toReact"
import useEditor from "./useEditor"
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
	// sortFormats,
} from "./formatsEnum"

import "./Editor.css"

;(() => {
	noopTextContent()
})()

// Computes a type map and array of types for a component.
//
// TODO: Extract
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
//
// TODO: Extract
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

// Parses spans.
//
// TODO: Extract
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
		const component = {}
		let lastRef = component
		let ref = lastRef
		for (const format of span.formats.sort(/* sortFormats */)) {
			Object.assign(ref, { // <- lastRef
				type: format,
				props: {
					...span[format],
					children: {}, // <- ref
				},
			})
			lastRef = ref
			ref = ref.props.children
		}
		lastRef.props.children = span.content
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
					content: "WYSIWYG hello hello",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://heroicons.dev",
					},
				},
				" editor.",
			],
		},
	])

	// TODO (1): Add backspace handlers
	// TODO (2): Add tab and enter handlers
	// TODO (3): Add format handlers
	// TODO (4): Add shortcut handlers
	// TODO (5): Add undo handlers
	React.useLayoutEffect(
		React.useCallback(() => {
			// Eagerly remove range because of performance:
			//
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
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
					const startRange = computeRange(state.startCursor)
					try {
						const range = document.createRange()
						range.setStart(startRange.container, startRange.offset)
						// range.collapse()
						// selection.removeAllRanges()
						selection.addRange(range)
					} catch (error) {
						console.error(error)
					}
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

				onFocus={dispatch.focus}
				onBlur={dispatch.blur}
				onSelect={() => {
					const cursors = computeCursors()
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(...cursors)
				}}
				onPointerDown={() => {
					pointerIsDownRef.current = true
				}}
				onPointerMove={() => {
					if (!state.focused || !pointerIsDownRef.current) {
						pointerIsDownRef.current = false
						return
					}
					const cursors = computeCursors()
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(...cursors)
				}}
				onPointerUp={() => {
					pointerIsDownRef.current = false
				}}

				onKeyDown={e => {
					switch (detectKeyDownType(e)) {
					case keyDownTypesEnum.formatEmphasis:
						e.preventDefault()
						console.log("formatEmphasis")
						break
					case keyDownTypesEnum.formatStrong:
						e.preventDefault()
						console.log("formatStrong")
						break
					case keyDownTypesEnum.tab:
						e.preventDefault()
						console.log("tab")
						break
					case keyDownTypesEnum.enter:
						e.preventDefault()
						console.log("enter")
						break
					case keyDownTypesEnum.backspaceParagraph:
						e.preventDefault()
						// console.log("backspaceParagraph")
						dispatch.backspaceParagraph()
						break
					case keyDownTypesEnum.backspaceWord:
						e.preventDefault()
						// console.log("backspaceWord")
						dispatch.backspaceWord()
						break
					case keyDownTypesEnum.backspaceRune:
						e.preventDefault()
						// console.log("backspaceRune")
						dispatch.backspaceRune()
						break
					case keyDownTypesEnum.forwardBackspaceWord:
						e.preventDefault()
						// console.log("forwardBackspaceWord")
						dispatch.forwardBackspaceWord()
						break
					case keyDownTypesEnum.forwardBackspaceRune:
						e.preventDefault()
						// console.log("forwardBackspaceRune")
						dispatch.forwardBackspaceRune()
						break
					case keyDownTypesEnum.undo:
						e.preventDefault()
						console.log("undo")
						break
					case keyDownTypesEnum.redo:
						e.preventDefault()
						console.log("redo")
						break

					// case keyDownTypesEnum.characterData:
					// 	e.preventDefault()
					// 	// TODO
					// 	break

					default:
						// No-op
						break
					}
				}}

				onInput={() => {
					const cursors = computeCursors()
					if (!cursors) {
						throw new Error("onInput: no such cursors")
					}
					const element = document.getElementById(cursors[0].uuid)
					if (!element) {
						throw new Error("onInput: no such element")
					}
					const spans = readSpans(element)
					// // DEBUG
					// console.log(element.id, spans, ...cursors)
					dispatch.input(element.id, spans, ...cursors)
				}}

				contentEditable
				suppressContentEditableWarning

				data-codex-root

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

			<div>
				{/* ... */}
			</div>

			<CodexEditor components={{ Header, Paragraph, Emphasis, Strong, Code, Strikethrough, Anchor }} />

		</div>
	</div>
)

export default App
