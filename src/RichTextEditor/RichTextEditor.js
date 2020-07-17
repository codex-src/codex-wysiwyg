import * as Range from "./methods/Range"
import Debugger from "./components/Debugger"
import keyDownTypeFor from "./utils/keyDownTypeFor"
import React from "react"
import Renderer from "./components/Renderer"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"
import { parseRenderedChildren } from "./parsers"

import "./RichTextEditor.css"

const RichTextEditor = ({ state, dispatch }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	// Disables read-only mode on DOMContentLoaded.
	useDOMContentLoadedCallback(dispatch.disableReadOnlyMode)

	// Returns a handler when read-only mode is disabled.
	const readWriteOnlyHandler = handler => {
		if (state.readOnlyModeEnabled) {
			return undefined
		}
		return handler
	}

	return (
		<div>

			<article
				ref={ref}

				className="em-context focus:outline-none"

				onFocus={readWriteOnlyHandler(e => {
					dispatch.focus()
				})}

				onBlur={readWriteOnlyHandler(e => {
					dispatch.blur()
				})}

				onPointerDown={readWriteOnlyHandler(e => {
					pointerdownRef.current = true
				})}

				onPointerMove={readWriteOnlyHandler(e => {
					if (!state.focused || !pointerdownRef.current) {
						if (!state.focused && pointerdownRef.current) {
							pointerdownRef.current = false
						}
						return
					}
					const range = Range.getCurrent(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				})}

				onPointerUp={readWriteOnlyHandler(e => {
					pointerdownRef.current = false
				})}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={readWriteOnlyHandler(e => {
					const range = Range.getCurrent(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				})}

				// case "apply-format-markdown-em":
				// case "apply-format-markdown-strong":
				// case "apply-format-markdown-code":
				// case "apply-format-markdown-strike":
				// case "apply-format-markdown-a":

				onKeyDown={readWriteOnlyHandler(e => {
					const keydownType = keyDownTypeFor(e)
					if (keydownType) {
						console.log({ "keydown-type": keydownType })
					}
					switch (keydownType) {
					case "apply-format-plaintext":
					case "apply-format-em":
					case "apply-format-strong":
					case "apply-format-code":
					case "apply-format-strike":
					case "apply-format-a":
						e.preventDefault()
						break
					case "insert-text":
						// TODO
						break
					case "insert-tab":
					case "insert-soft-paragraph":
					case "insert-hard-paragraph":
					case "insert-horizontal-rule":
					case "delete-rtl-line":
					case "delete-rtl-word":
					case "delete-rtl-rune":
					case "delete-ltr-word":
					case "delete-ltr-rune":
					case "undo":
					case "redo":
						e.preventDefault()
						break
					default:
						// No-op
						break
					}
				})}


				onInput={readWriteOnlyHandler(e => {
					const range = Range.collapseStart(Range.getCurrent(ref.current))()
					const children = parseRenderedChildren(document.getElementById(range.start.key))
					// defer(children)
					dispatch.uncontrolledInput(children, range)
				})}

				// onCut={readWriteOnlyHandler(e => {
				// 	e.preventDefault()
				// 	// ...
				// })}

				// onCopy={readWriteOnlyHandler(e => {
				// 	e.preventDefault()
				// 	// ...
				// })}

				// onPaste={readWriteOnlyHandler(e => {
				// 	e.preventDefault()
				// 	// ...
				// })}

				// onDragStart={readWriteOnlyHandler(e => {
				// 	e.preventDefault()
				// 	// ...
				// })}

				contentEditable={!state.readOnlyModeEnabled}
				suppressContentEditableWarning={!state.readOnlyModeEnabled}

				data-root
				data-read-only-mode={state.readOnlyModeEnabled}
				data-display-markdown-mode={state.displayMarkdownModeEnabled}
			>
				<Renderer
					forwardedRef={ref}
					state={state}
					dispatch={dispatch}
				/>
			</article>

			{/* DEBUG */}
			<Debugger
				state={state}
				dispatch={dispatch}
				// lastActionTimestamp
				// lastAction
				// readOnlyModeEnabled
				// focused
				// elements
				range
				// shouldRerender
			/>

		</div>
	)
}

export default RichTextEditor
