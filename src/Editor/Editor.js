import * as keydown from "./keydown"
import * as Range from "./Range"
import * as Readers from "./Readers"
import * as Types from "./Types"
import classNameString from "lib/classNameString"
import React from "react"
import ReactDOM from "react-dom"
import useEditor from "./useEditor"

import "./Editor.css"

const ReactRerenderer = ({ state, dispatch }) => (
	state.elements.map(({ type: T, key, props }) => (
		React.createElement(Types.components[T], {
			key,
			id: key, // Passes key as id
			...props,
		})
	))
)

const Editor = ({ markup, children }) => {
	const ref = React.useRef(null)

	// Tracks whether the "pointerdown" event is active.
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor({ markup, children })

	React.useLayoutEffect(
		React.useCallback(() => {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const domSelection = document.getSelection()
			if (domSelection.rangeCount) {
				domSelection.removeAllRanges()
			}
			ReactDOM.render(<ReactRerenderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				try {
					const domRange = Range.toDOMRange(state.range)
					domSelection.addRange(domRange)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.shouldRerender],
	)

	// TODO: Add unlockedHandler pattern
	return (
		<div>

			<article
				ref={ref}

				className={classNameString(`
					subpixel-antialiased

					em-context
					focus:outline-none
				`)}

				style={{
					MozTabSize: 4,
					tabSize: 4,
				}}

				onFocus={e => {
					dispatch.focus()
				}}

				onBlur={e => {
					dispatch.blur()
				}}

				onPointerDown={e => {
					pointerdownRef.current = true
				}}

				onPointerMove={e => {
					if (!state.focused) {
						pointerdownRef.current = false
						return
					}
					if (!pointerdownRef.current) {
						// No-op
						return
					}
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				}}

				onPointerUp={e => {
					pointerdownRef.current = false
				}}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={e => {
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				}}

				onKeyDown={e => {

					// const keydownT = keydown.detectType(e)
					// if (keydownT) {
					// 	console.log({ keydownT })
					// }

					switch (keydown.detectType(e)) {
					case keydown.enum.applyFormatPlaintext:
						e.preventDefault()
						dispatch.applyFormatPlaintext()
						return
					case keydown.enum.applyFormatEm:
						e.preventDefault()
						dispatch.applyFormatEm()
						return
					case keydown.enum.applyFormatStrong:
						e.preventDefault()
						dispatch.applyFormatStrong()
						return
					case keydown.enum.applyFormatCode:
						e.preventDefault()
						dispatch.applyFormatCode()
						return
					case keydown.enum.applyFormatStrike:
						e.preventDefault()
						dispatch.applyFormatStrike()
						return
					case keydown.enum.applyFormatA:
						e.preventDefault()
						dispatch.applyFormatA("https://google.com") // TODO
						return
					case keydown.enum.insertTextTab:
						e.preventDefault()
						dispatch.insert("\t", "text/plain")
						return
					case keydown.enum.insertTextEnter:
						e.preventDefault()
						dispatch.insert("\n", "text/plain")
						return

						// case keydown.enum.insertText:
						// 	e.preventDefault()
						// 	dispatch.insertText()
						// 	return

					case keydown.enum.backspaceRune:
						e.preventDefault()
						dispatch.backspaceRune()
						return
					case keydown.enum.backspaceWord:
						e.preventDefault()
						dispatch.backspaceWord()
						return
					case keydown.enum.backspaceLine:
						e.preventDefault()
						dispatch.backspaceLine()
						return
					case keydown.enum.deleteRune:
						e.preventDefault()
						dispatch.deleteRune()
						return
					case keydown.enum.deleteWord:
						e.preventDefault()
						dispatch.deleteWord()
						return
					case keydown.enum.undo:
						e.preventDefault()
						dispatch.undo()
						return
					case keydown.enum.redo:
						e.preventDefault()
						dispatch.redo()
						return
					default:
						// No-op
						break
					}
				}}

				onInput={e => {
					// const collapsed = Range.collapse(Range.compute(ref.current)) // Takes precedence
					// const spans = Readers.rendered.spans(document.getElementById(collapsed[0].key))
					// dispatch.input(spans, collapsed)
					dispatch.uncontrolledInputHandler()
				}}

				onCut={e => {
					e.preventDefault()
					// TODO: dispatch.cut()
				}}

				onCopy={e => {
					e.preventDefault()
					// TODO: dispatch.copy()
				}}

				onPaste={e => {
					e.preventDefault()
					// TODO: dispatch.paste(mimeType)
				}}

				onDragStart={e => {
					e.preventDefault()
				}}

				contentEditable={!state.locked}
				suppressContentEditableWarning={!state.locked}
			/>

			{/* Debugger */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify({
					...state,
					// elements: undefined,
				}, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
