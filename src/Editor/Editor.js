import * as Range from "./methods/Range"
import componentMap from "./components/componentMap"
import defer from "./utils/children/defer"
import keyDownTypeFor from "./utils/keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"
import { parseRenderedChildren } from "./parsers"

import "./Editor.css"

const Renderer = ({ state, dispatch }) => (
	state.elements.map(({ type, key, props }) => (
		React.createElement(componentMap[type], {
			key,
			id: key,
			...props,
		})
	))
)

const Editor = ({ state, dispatch }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	// Disables read-only mode on DOMContentLoaded.
	useDOMContentLoadedCallback(() => dispatch({
		type: "DISABLE_READ_ONLY_MODE",
	}))

	// Rerenders on state.shouldRerender.
	React.useLayoutEffect(
		React.useCallback(() => {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(<Renderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (state.readOnlyModeEnabled /* FIXME? */ || !state.focused) {
					// No-op
					return
				}
				try {
					const range = Range.toUserLiteral(state.range)()
					selection.addRange(range)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.shouldRerender],
	)

	// Returns a handler when read-only mode is disabled.
	const readWriteOnlyHandler = handler => {
		if (state.readOnlyModeEnabled) {
			return undefined
		}
		return handler
	}

	return (
		<React.Fragment>
			<article
				ref={ref}

				className="em-context focus:outline-none"

				onFocus={readWriteOnlyHandler(e => {
					dispatch({
						type: "FOCUS",
					})
				})}

				onBlur={readWriteOnlyHandler(e => {
					dispatch({
						type: "BLUR",
					})
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
					dispatch({
						type: "SELECT",
						range,
					})
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
					dispatch({
						type: "SELECT",
						range,
					})
				})}

				onKeyDown={readWriteOnlyHandler(e => {
					const keyDownType = keyDownTypeFor(e)
					if (keyDownType) {
						console.log(keyDownType)
					}
					switch (keyDownType) {
					case "apply-format-plaintext":
					case "apply-format-em":
					case "apply-format-strong":
					case "apply-format-code":
					case "apply-format-strike":
					case "apply-format-a":
					case "apply-format-markdown-em":
					case "apply-format-markdown-strong":
					case "apply-format-markdown-code":
					case "apply-format-markdown-strike":
					case "apply-format-markdown-a":
						e.preventDefault()
						dispatch({
							type: "APPLY_FORMAT",
							keyDownType,
						})
						break
					case "insert-text":
					case "insert-tab":
					case "insert-soft-paragraph":
					case "insert-hard-paragraph":
					case "insert-horizontal-rule":
						// TODO
						if (keyDownType === "insert-text") {
							if (!state.range.collapsed()) {
								e.preventDefault()
								dispatch({
									type: "INSERT_TEXT",
									keyDownType,
								})
								break
							}
							break
						}
						e.preventDefault()
						dispatch({
							type: "INSERT_TEXT",
							keyDownType,
						})
						break
					case "delete-rtl-rune":
					case "delete-rtl-word":
					case "delete-rtl-line":
					case "delete-ltr-rune":
					case "delete-ltr-word":
						e.preventDefault()
						dispatch({
							type: "DELETE",
							keyDownType,
						})
						break
					case "undo":
					case "redo":
						e.preventDefault()
						// TODO
						break
					default:
						// No-op
						break
					}
				})}

				onInput={readWriteOnlyHandler(e => {
					const range = Range.getCurrent(ref.current)
					const children = parseRenderedChildren(document.getElementById(range.start.key))
					defer(children)
					dispatch({
						type: "UNCONTROLLED_INPUT",
						range,
						children,
					})
				})}

				onCut={readWriteOnlyHandler(e => {
					e.preventDefault()
					// TODO
				})}

				onCopy={readWriteOnlyHandler(e => {
					e.preventDefault()
					// TODO
				})}

				onPaste={readWriteOnlyHandler(e => {
					e.preventDefault()
					// TODO
				})}

				onDragStart={readWriteOnlyHandler(e => {
					e.preventDefault()
					// TODO
				})}

				contentEditable={!state.readOnlyModeEnabled}
				suppressContentEditableWarning={!state.readOnlyModeEnabled}

				data-root
			/>
			{process.env.NODE_ENV !== "production" && (
				<div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}>
					{JSON.stringify(state, null, "\t")}
				</div>
			)}
		</React.Fragment>
	)
}

export default Editor
