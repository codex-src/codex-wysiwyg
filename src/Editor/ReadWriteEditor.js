import componentMap from "./components/componentMap"
import defer from "./utils/defer"
import keyDownTypeFor from "./keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
import { parseRenderedChildren } from "./parsers"

import { // Unsorted
	getCurrentRange,
	rangeIsCollapsed,
	convRangeToUserLiteral,
} from "./methods/Range"

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
const ReadWriteEditor = ({ className, style, state, dispatch }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

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
							if (!rangeIsCollapsed(state.range)) {
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
			{/* {JSON.stringify( */}
			{/* 	state.range, */}
			{/* 	null, */}
			{/* 	"\t", */}
			{/* )} */}
		</div>
	)
}

export default ReadWriteEditor
