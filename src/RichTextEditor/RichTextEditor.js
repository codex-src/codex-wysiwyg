import React from "react"
import ReactDOM from "react-dom"
import useRichTextEditor from "./useRichTextEditor"

// // React renderer.
// const ReactRenderer = ({ state, dispatch }) => (
// 	state.elements.map(({ type: T, key, props }) => (
// 		React.createElement(renderMap[T], {
// 			key,
// 			id: key,
// 			...props,
// 		})
// 	))
// )

const Editor = ({ markup, children }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useRichTextEditor({ markup, children })
	console.log(state, dispatch)

	// // Disables read-only mode on DOMContentLoaded.
	// useDOMContentLoadedCallback(() => {
	// 	dispatch({ type: "DISABLE_READ_ONLY_MODE" })
	// })

	// // Rerenders on state.shouldRerender.
	// React.useLayoutEffect(
	// 	React.useCallback(() => {
	// 		if (!ref.current) {
	// 			// No-op
	// 			return
	// 		}
	// 		// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
	// 		const selection = document.getSelection()
	// 		if (selection.rangeCount) {
	// 			selection.removeAllRanges()
	// 		}
	// 		console.log("ReactDOM.render")
	// 		ReactDOM.render(<ReactRenderer state={state} dispatch={dispatch} />, ref.current, () => {
	// 			if (state.readOnlyModeEnabled || !state.focused) {
	// 				// No-op
	// 				return
	// 			}
	// 			try {
	// 				const range = state.range.toUserLiteral(state.range)
	// 				selection.addRange(range)
	// 			} catch (error) {
	// 				console.error(error)
	// 			}
	// 		})
	// 	}, [state, dispatch]),
	// 	[state.shouldRerender],
	// )

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
					console.log("onFocus")
					dispatch.focus()
				})}

				onBlur={readWriteOnlyHandler(e => {
					console.log("onBlur")
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
				Hello
			</article>

			{/* DEBUG */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify({
					...state,
					elements: undefined,
				}, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
