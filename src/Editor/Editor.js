// import * as Readers from "./Readers" // TODO
// import detectKeydownType from "./utils/keydown/detectKeydownType"
// import useDOMContentLoaded from "lib/useDOMContentLoaded"
import React from "react"
import ReactDOM from "react-dom"
import useEditor from "./useEditor"

import "./Editor.css"

// // React renderer for the current state.
// const ReactRenderer = ({ state, dispatch }) => (
// 	state.elements.map(({ type: T, key, props }) => (
// 		React.createElement(types.components[T], {
// 			key,
// 			id: key, // Propagate key as id
// 			...props,
// 		})
// 	))
// )

const Editor = ({ html }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor(html)

	// // Disables read-only mode on DOMContentLoaded.
	// const DOMContentLoaded = useDOMContentLoaded()
	// React.useEffect(() => {
	// 	if (!DOMContentLoaded) {
	// 		// No-op
	// 		return
	// 	}
	// 	dispatch({ type: "DISABLE_READ_ONLY_MODE" })
	// }, [DOMContentLoaded, dispatch])

	// // Rerenders on state.shouldRender.
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
	// 		ReactDOM.render(<ReactRenderer state={state} dispatch={dispatch} />, ref.current, () => {
	// 			if (!state.focused) {
	// 				// No-op
	// 				return
	// 			}
	// 			// try {
	// 			const range = state.range.toRange(state.range)
	// 			selection.addRange(range)
	// 			// } catch (error) {
	// 			// 	console.error(error)
	// 			// }
	// 		})
	// 	}, [state, dispatch]),
	// 	[state.shouldRender],
	// )

	// Returns a handler when read-only mode is disabled.
	const readWriteHandler = handler => {
		if (state.isReadOnlyModeEnabled) {
			return undefined
		}
		return handler
	}

	return (
		<div>

			<article
				ref={ref}

				// TODO: Change focus:outline-none to inline-styles?
				className="em-context focus:outline-none"

				// onFocus={readWriteHandler(e => {
				// 	dispatch({ type: "FOCUS" })
				// })}

				// onBlur={readWriteHandler(e => {
				// 	dispatch({ type: "BLUR" })
				// })}

				// onPointerDown={readWriteHandler(e => {
				// 	pointerdownRef.current = true
				// })}

				// onPointerMove={readWriteHandler(e => {
				// 	if (!state.focused) {
				// 		pointerdownRef.current = false
				// 		return
				// 	}
				// 	if (!pointerdownRef.current) {
				// 		// No-op
				// 		return
				// 	}
				// 	const range = SyntheticRange.getCurrent(ref.current)
				// 	if (!range) {
				// 		// No-op
				// 		return
				// 	}
				// 	dispatch({
				// 		type: "SELECT",
				// 		range,
				// 	})
				// })}

				// onPointerUp={readWriteHandler(e => {
				// 	pointerdownRef.current = false
				// })}

				// // TODO: Add COMPAT guard for select-all or prevent
				// // default?
				// onSelect={readWriteHandler(e => {
				// 	const range = SyntheticRange.getCurrent(ref.current)
				// 	if (!range) {
				// 		// No-op
				// 		return
				// 	}
				// 	dispatch({
				// 		type: "SELECT",
				// 		range,
				// 	})
				// })}

				// onKeyDown={readWriteHandler(e => {
				// 	const keydownType = detectKeydownType(e)
				// 	if (keydownType) {
				// 		console.log(keydownType)
				// 	}
				// 	switch (keydownType) {
				// 	case "apply-format-plaintext":
				// 	case "apply-format-markdown-plaintext":
				// 		e.preventDefault()
				// 		dispatch.applyFormat("plaintext")
				// 		return
				// 	case "apply-format-em":
				// 	case "apply-format-markdown-em":
				// 		e.preventDefault()
				// 		dispatch.applyFormat(types.enum.em)
				// 		return
				// 	case "apply-format-strong":
				// 	case "apply-format-markdown-strong":
				// 		e.preventDefault()
				// 		dispatch.applyFormat(types.enum.strong)
				// 		return
				// 	case "apply-format-code":
				// 	case "apply-format-markdown-code":
				// 		e.preventDefault()
				// 		dispatch.applyFormat(types.enum.code)
				// 		return
				// 	case "apply-format-strike":
				// 	case "apply-format-markdown-strike":
				// 		e.preventDefault()
				// 		dispatch.applyFormat(types.enum.strike)
				// 		return
				// 	case "apply-format-a":
				// 	case "apply-format-markdown-a":
				// 		e.preventDefault()
				// 		dispatch.applyFormat(types.enum.a, { href: "https://google.com" })
				// 		return
				//
				// 		// "insert-text"
				// 		// "insert-tab"
				// 		// "insert-soft-paragraph"
				// 		// "insert-paragraph"
				//
				// 	case "backspace-rune":
				// 		e.preventDefault()
				// 		dispatch.backspaceRune()
				// 		return
				// 	case "backspace-word":
				// 		e.preventDefault()
				// 		dispatch.backspaceWord()
				// 		return
				// 	case "backspace-line":
				// 		e.preventDefault()
				// 		dispatch.backspaceLine()
				// 		return
				// 	case "delete-rune":
				// 		e.preventDefault()
				// 		dispatch.deleteRune()
				// 		return
				// 	case "delete-word":
				// 		e.preventDefault()
				// 		dispatch.deleteWord()
				// 		return
				//
				// 	case "undo":
				// 		e.preventDefault()
				// 		dispatch.undo()
				// 		return
				// 	case "redo":
				// 		e.preventDefault()
				// 		dispatch.redo()
				// 		return
				//
				// 	default:
				// 		// No-op
				// 		break
				// 	}
				// })}

				// onInput={readWriteHandler(e => {
				// 	const collapsed = Range.collapse(Range.compute(ref.current)) // Takes precedence
				// 	const spans = Readers.rendered.spans(document.getElementById(collapsed[0].key))
				// 	dispatch.uncontrolledInputHandler(spans, collapsed)
				// })}

				// onCut={readWriteHandler(e => {
				// 	e.preventDefault()
				// 	// TODO: e.clipboardData.setData("text/plain", ...)
				// })}

				// onCopy={readWriteHandler(e => {
				// 	e.preventDefault()
				// 	// TODO: e.clipboardData.setData("text/plain", ...)
				// })}

				// onPaste={readWriteHandler(e => {
				// 	e.preventDefault()
				// 	// TODO: e.clipboardData.getData("text/plain")
				// })}

				// onDragStart={readWriteHandler(e => {
				// 	e.preventDefault()
				// })}

				contentEditable={!state.isReadOnlyModeEnabled}
				suppressContentEditableWarning={!state.isReadOnlyModeEnabled}
				data-root
			/>

			{/* DEBUG */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
