import componentMap from "./components/componentMap"
import keyDownTypeFor from "./keyDownTypeFor"
import rangeIsCollapsed from "./utils/rangeIsCollapsed"
import React from "react"
import ReactDOM from "react-dom"
import tmpl from "lib/x/tmpl"

import {
	initElementsFromChildren,
	parseRenderedChildren,
} from "./parsers"

import { // Unsorted
	getCurrentRange,
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

	return (
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
				const keyDownType = keyDownTypeFor(e)
				let formatType = ""
				let text = ""
				let deleteType = ""

				if (keyDownType) {
					console.log({ keyDownType })
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
					dispatch({
						type: "APPLY_FORMAT",
						formatType, // TODO: Add props
					})
					break
				case "apply-format-markdown-em":
				case "apply-format-markdown-strong":
				case "apply-format-markdown-code":
				case "apply-format-markdown-strike":
				case "apply-format-markdown-a":
					if (!rangeIsCollapsed(state.range)) {
						formatType = keyDownType.slice("apply-format-markdown-".length)
						e.preventDefault()
						dispatch({
							type: "APPLY_FORMAT",
							formatType, // TODO: Add props
						})
					}
					break
				case "insert-text":
					// if (rangeIsCollapsed(state.range) && state.applyType) {
					// 	e.preventDefault()
					// 	text = e.key
					// 	dispatch({
					// 		type: "INSERT_TEXT",
					// 		text,
					// 	})
					if (!rangeIsCollapsed(state.range)) {
						e.preventDefault()
						text = e.key
						dispatch({
							type: "INSERT_TEXT",
							text,
						})
					}
					break
				case "insert-tab":
					e.preventDefault()
					text = "\t"
					dispatch({
						type: "INSERT_TEXT",
						text,
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
