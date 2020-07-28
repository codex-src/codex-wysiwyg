import componentMap from "./components/componentMap"
import keyDownTypeFor from "./keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
import testForSelection from "./useEditor/testForSelection"
import tmpl from "lib/x/tmpl"

import {
	initElementsFromChildren,
	parseRenderedChildren,
} from "./parsers"

import { // Unsorted
	getCurrentRange,
	convRangeToUserLiteral,
} from "./Range"

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
			const elements = initElementsFromChildren(children)
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
					const userRange = convRangeToUserLiteral(state.range)
					selection.addRange(userRange)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.shouldRerender],
	)

	// // Exclusively returns a handler when state.focused=true.
	// const readWriteHandler = handler => {
	// 	if (!state.focused) {
	// 		return null
	// 	}
	// 	return handler
	// }

	return (
		<React.Fragment>

			<article
				ref={ref}

				className={tmpl`em-context ${className}`}
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
					let formatType = ""
					let insertText = ""
					let deleteType = ""

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
						formatType = keyDownType.slice("apply-format-".length)
						let types = {}
						if (formatType !== "plaintext") {
							types[formatType] = {} // TODO
						}
						dispatch({
							type: "ADD_OR_REMOVE_TYPES",
							types,
						})
						break
					case "apply-format-markdown-em":
					case "apply-format-markdown-strong":
					case "apply-format-markdown-code":
					case "apply-format-markdown-strike":
					case "apply-format-markdown-a":
						if (testForSelection(state)) {
							e.preventDefault()
							formatType = keyDownType.slice("apply-format-markdown-".length)
							let types = {}
							if (formatType !== "plaintext") {
								types[formatType] = {} // TODO
							}
							dispatch({
								type: "ADD_OR_REMOVE_TYPES",
								types,
							})
						}
						break
					case "insert-text":
						if (testForSelection(state)) {
							e.preventDefault()
							insertText = e.key
							dispatch({
								type: "INSERT_TEXT",
								insertText,
							})
						}
						break
					case "insert-tab":
						e.preventDefault()
						insertText = "\t"
						dispatch({
							type: "INSERT_TEXT",
							insertText,
						})
						break
					case "insert-soft-paragraph":
					case "insert-hard-paragraph":
					case "insert-horizontal-rule":
						e.preventDefault()
						dispatch({
							type: "INSERT_HARD_PARAGRAPH",
						})
						break
					case "delete-rtl-rune":
					case "delete-rtl-word":
					case "delete-rtl-line":
					case "delete-ltr-rune":
					case "delete-ltr-word":
						e.preventDefault()
						deleteType = keyDownType.slice("delete-".length)
						dispatch({
							type: "DELETE",
							deleteType,
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

					// throw new Error(`Editor.onKeyDown: no such key down type; keyDownType=${keyDownType}`)
				}}

				onInput={e => {
					const range = getCurrentRange(ref.current)
					const children = parseRenderedChildren(document.getElementById(range.start.key))
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

				// onCopy={e => {
				// 	e.preventDefault()
				// 	// TODO
				// }}

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

			{process.env.NODE_ENV !== "production" && (
				<pre className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ tabSize: 2 }}>
					{JSON.stringify(
						{
							focused: state.focused,
							range: state.range,
							rangeTypes: state.rangeTypes,
							// ...
						},
						null,
						"\t",
					)}
				</pre>
			)}

		</React.Fragment>
	)
}

// {process.env.NODE_ENV !== "production" && (
// 	<pre className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ tabSize: 2 }}>
// 		{JSON.stringify(
// 			{
// 				// elements: state.elements,
// 				applyType: state.applyType,
// 				range: state.range,
// 			},
// 			null,
// 			"\t",
// 		)}
// 	</pre>
// )}

export default Editor
