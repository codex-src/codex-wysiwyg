import detectKeyDownType from "./detectKeyDownType"
import formatsEnum from "./formatsEnum"
import keyDownTypesEnum from "./keyDownTypesEnum"
import noopTextContent from "./noopTextContent"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
import useEditor from "./useEditor"
import uuidv4 from "uuid/v4"
import { computeDOMRange } from "./ranges"
import { computeVDOMCursors } from "./cursors"
import { readVDOMSpans } from "./spans"

import {
	Anchor,
	Code,
	Emphasis,
	Header,
	Paragraph,
	Strikethrough,
	Strong,
} from "./components"

import "./Editor.css"

;(() => {
	noopTextContent()
})()

const Editor = () => {

	// Maps enum types to renderable React components.
	const renderableMap = React.useMemo(() => ({
		[formatsEnum.Header]: Header,
		[formatsEnum.Paragraph]: Paragraph,
		[formatsEnum.emphasis]: Emphasis,
		[formatsEnum.strong]: Strong,
		[formatsEnum.code]: Code,
		[formatsEnum.strikethrough]: Strikethrough,
		[formatsEnum.anchor]: Anchor,
	}), [])

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
				{
					content: " I’m making some ",
					formats: [formatsEnum.strong],
				},
				{
					content: "progress ",
					formats: [formatsEnum.code],
				},
				{
					content: " on making a ",
					formats: [],
				},
				{
					content: "WYSIWYG",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://heroicons.dev",
					},
				},
				{
					content: " editor.",
					formats: [],
				},
				{
					content: "WYSIWYG",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://heroicons.dev",
					},
				},
			],
		},
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
				{
					content: " I’m making some ",
					formats: [formatsEnum.strong],
				},
				{
					content: "progress ",
					formats: [formatsEnum.code],
				},
				{
					content: " on making a ",
					formats: [],
				},
				{
					content: "WYSIWYG",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://heroicons.dev",
					},
				},
				{
					content: " editor.",
					formats: [],
				},
				{
					content: "WYSIWYG",
					formats: [formatsEnum.anchor],
					[formatsEnum.anchor]: {
						href: "https://heroicons.dev",
					},
				},
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
					const range = computeDOMRange(state.cursors[0])
					try {
						const domRange = document.createRange()
						domRange.setStart(range.container, range.offset)
						domRange.collapse()
						selection.addRange(domRange)
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
					const cursors = computeVDOMCursors()
					dispatch.select(cursors)
				}}
				onPointerDown={() => {
					pointerIsDownRef.current = true
				}}
				onPointerMove={() => {
					if (!state.focused || !pointerIsDownRef.current) {
						pointerIsDownRef.current = false
						return
					}
					const cursors = computeVDOMCursors()
					dispatch.select(cursors)
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

					case keyDownTypesEnum.characterData:
						if (!state.cursors.collapsed) {
							e.preventDefault()
							dispatch.write(e.key)
							return
						}
						break

					case keyDownTypesEnum.characterDataDead:
						// TODO
						break

					default:
						// No-op
						break
					}
				}}

				onInput={() => {
					const [cursor] = computeVDOMCursors()
					const uuidElement = document.getElementById(cursor.uuid)
					if (!uuidElement) {
						throw new Error("onInput: no such uuid dom element")
					}
					const spans = readVDOMSpans(uuidElement)
					dispatch.input(uuidElement.id, spans, cursor)
				}}

				contentEditable
				suppressContentEditableWarning

				data-codex-root
			/>

			{/* Debugger */}
			<div className="mt-6 whitespace-pre font-mono text-xs leading-tight" style={{ tabSize: 2 }}>
				{JSON.stringify(state, (key, value) => {
					if (key === "formats") {
						return value
					}
					return value
				}, "\t")}
			</div>

		</div>
	)
}

export default Editor
