import componentMap from "./components/componentMap"
import defer from "./utils/defer"
import keyDownTypeFor from "./keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
import { parseElementsFromChildren } from "./useEditor/parseElements"
import { parseRenderedChildren } from "./parsers"

import { // Unsorted
	getCurrentRange,
	rangeIsCollapsed,
	convRangeToUserLiteral,
} from "./types/Range"

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

// Renders a read-write editor.
const Editor = ({ className, style, state, dispatch, children }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	// Manually updates elements from props.children.
	React.useLayoutEffect(
		React.useCallback(() => {
			const elements = parseElementsFromChildren(children)
			dispatch({
				type: "MANUALLY_UPDATE_ELEMENTS",
				elements,
			})
		}, [dispatch, children]),
		[],
	)

	// Rerenders on state.shouldRerender.
	React.useLayoutEffect(
		React.useCallback(() => {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(<Renderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				try {
					const urange = convRangeToUserLiteral(state.range)
					selection.addRange(urange)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.shouldRerender],
	)

	return (
		<div className="em-context">
			<article
				ref={ref}

				className={className}
				style={style}

				onFocus={e => {
					dispatch({
						type: "FOCUS",
					})
				}}

				onBlur={e => {
					dispatch({
						type: "BLUR",
					})
				}}

				onPointerDown={e => {
					pointerdownRef.current = true
				}}

				onPointerMove={e => {
					if (!state.focused || !pointerdownRef.current) {
						if (!state.focused && pointerdownRef.current) {
							pointerdownRef.current = false
						}
						return
					}
					const range = getCurrentRange(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				}}

				onPointerUp={e => {
					pointerdownRef.current = false
				}}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={e => {
					const range = getCurrentRange(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				}}

				onKeyDown={e => {
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
						e.preventDefault()
						dispatch({
							type: "APPLY_FORMAT",
							keyDownType,
						})
						break
					case "apply-format-markdown-em":
					case "apply-format-markdown-strong":
					case "apply-format-markdown-code":
					case "apply-format-markdown-strike":
					case "apply-format-markdown-a":
						if (rangeIsCollapsed(state.range)) {
							// TODO
						} else {
							e.preventDefault()
							dispatch({
								type: "APPLY_FORMAT",
								keyDownType,
							})
						}
						break
					case "insert-text":
						if (rangeIsCollapsed(state.range)) {
							// No-op
							break
						} else {
							e.preventDefault()
							dispatch({
								type: "INSERT_TEXT",
								key: e.key,
							})
						}
						break
					case "insert-tab":
						if (rangeIsCollapsed(state.range)) {
							e.preventDefault()
							dispatch({
								type: "INSERT_TEXT",
								key: "\t",
							})
						} else {
							// TODO
						}
						break
					case "insert-soft-paragraph":
					case "insert-hard-paragraph":
					case "insert-horizontal-rule":
						e.preventDefault()
						// TODO
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
				}}

				onInput={e => {
					const range = getCurrentRange(ref.current)
					const children = parseRenderedChildren(document.getElementById(range.start.key))
					defer(children)
					dispatch({
						type: "UNCONTROLLED_INPUT",
						range,
						children,
					})
				}}

				onCut={e => {
					e.preventDefault()
					// TODO
				}}

				onCopy={e => {
					e.preventDefault()
					// TODO
				}}

				onPaste={e => {
					e.preventDefault()
					// TODO
				}}

				onDragStart={e => {
					e.preventDefault()
					// TODO
				}}

				contentEditable
				suppressContentEditableWarning

				data-root
			/>

			{/* DEBUGGER */}
			{process.env.NODE_ENV !== "production" && (
				<pre className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ tabSize: 2 }}>
					{JSON.stringify(
						{
							range: state.range,
							pendingRange: state.pendingRange,
						},
						null,
						"\t",
					)}
				</pre>
			)}

		</div>
	)
}

export default Editor
