import Debugger from "./components/Debugger"
import React from "react"
import Renderer from "./components/Renderer"
import useDOMContentLoadedCallback from "lib/x/useDOMContentLoadedCallback"
import useRichTextEditor from "./useRichTextEditor"

const RichTextEditor = ({ markup, children }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useRichTextEditor({ markup, children })

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

				// onPointerMove={readWriteOnlyHandler(e => {
				// 	// if (!state.focused) {
				// 	// 	pointerdownRef.current = false
				// 	// 	return
				// 	// }
				// 	// if (!pointerdownRef.current) {
				// 	// 	// No-op
				// 	// 	return
				// 	// }
				// 	if (!state.focused || !pointerdownRef.current) {
				// 		if (!state.focused && pointerdownRef.current) {
				// 			pointerdownRef.current = false
				// 		}
				// 		return
				// 	}
				// 	const range = Range.fromCurrent(ref.current)
				// 	if (!range) {
				// 		// No-op
				// 		return
				// 	}
				// 	dispatch({
				// 		type: "SELECT",
				// 		range,
				// 	})
				// })}

				// onPointerUp={readWriteOnlyHandler(e => {
				// 	pointerdownRef.current = false
				// })}

				// // TODO: Add COMPAT guard for select-all or prevent
				// // default?
				// onSelect={readWriteOnlyHandler(e => {
				// 	const range = Range.fromCurrent(ref.current)
				// 	if (!range) {
				// 		// No-op
				// 		return
				// 	}
				// 	dispatch({
				// 		type: "SELECT",
				// 		range,
				// 	})
				// })}

				// onKeyDown={readWriteOnlyHandler(e => {
				// 	// const keydownType = detectKeydownType(e)
				// 	// if (keydownType) {
				// 	// 	console.log(keydownType)
				// 	// }
				// 	const desc = detectKeydownType(e)
				// 	if (desc) {
				// 		console.log({ desc })
				// 	}
				// 	switch (desc) {
				// 	// case "apply-format-plaintext":
				// 	// case "apply-format-markdown-plaintext":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat("plaintext")
				// 	// 	return
				// 	// case "apply-format-em":
				// 	// case "apply-format-markdown-em":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat(types.enum.em)
				// 	// 	return
				// 	// case "apply-format-strong":
				// 	// case "apply-format-markdown-strong":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat(types.enum.strong)
				// 	// 	return
				// 	// case "apply-format-code":
				// 	// case "apply-format-markdown-code":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat(types.enum.code)
				// 	// 	return
				// 	// case "apply-format-strike":
				// 	// case "apply-format-markdown-strike":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat(types.enum.strike)
				// 	// 	return
				// 	// case "apply-format-a":
				// 	// case "apply-format-markdown-a":
				// 	// 	e.preventDefault()
				// 	// 	dispatch.applyFormat(types.enum.a, { href: "https://google.com" })
				// 	// 	return
				// 	// "insert-text"
				// 	// "insert-tab"
				// 	// "insert-soft-paragraph"
				// 	// "insert-paragraph"
				// 	case "backspace-rune":
				// 	case "backspace-word":
				// 	case "backspace-line":
				// 	case "delete-rune":
				// 	case "delete-word":
				// 		e.preventDefault()
				// 		dispatch({
				// 			type: "CONTROLLED_DELETE_HANDLER",
				// 			desc,
				// 		})
				// 		return
				// 		// case "undo":
				// 		// 	e.preventDefault()
				// 		// 	dispatch.undo()
				// 		// 	return
				// 		// case "redo":
				// 		// 	e.preventDefault()
				// 		// 	dispatch.redo()
				// 		// 	return
				// 	default:
				// 		// No-op
				// 		break
				// 	}
				// })}

				// onInput={readWriteOnlyHandler(e => {
				// 	const range = Range.fromCurrent(ref.current).collapse()
				// 	const children = rscanner.scanChildren(document.getElementById(range.start.key))
				// 	defer(children)
				// 	dispatch({
				// 		type: "UNCONTROLLED_INPUT_HANDLER",
				// 		children,
				// 		range,
				// 	})
				// })}

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
			>
				<Renderer
					forwardedRef={ref}
					state={state}
					dispatch={dispatch}
				/>
			</article>

			<Debugger
				state={state}
				dispatch={dispatch}
			/>

		</div>
	)
}

export default RichTextEditor
