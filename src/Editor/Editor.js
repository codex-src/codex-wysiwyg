import Elements from "./components/Elements"
// import keyDownTypeFor from "./keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
// import testForSelection from "./useEditor/testForSelection"

import {
	computeEditorRangeFromCurrentDOMRange,
	convertEditorRangeToDOMRange,
} from "./range"

// Supports:
//
// onFocus
// onBlur
// onSelect
// onKeyDown
// onCompositionEnd
// onInput
// onCut
// onCopy
// onPaste
//
// Renders a read-write editor.
const Editor = ({
	id,
	className,
	style,

	state,
	dispatch,

	...props
}) => {
	const articleRef = React.useRef(null)
	const isPointerDownRef = React.useRef(false)

	// Rerenders on state.shouldRerender.
	//
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useLayoutEffect(
		React.useCallback(() => {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(
				<Elements elements={state.elements} />,
				articleRef.current,
				() => {
					if (!state.focused) {
						// No-op
						return
					}
					try {
						const domRange = convertEditorRangeToDOMRange(state.range)
						selection.addRange(domRange)
					} catch (error) {
						console.error(error)
					}
				},
			)
		}, [state]),
		[state.shouldRerender],
	)

	return (
		<article
			ref={articleRef}

			id={id}

			className={[
				"em-context",
				className,
			].filter(Boolean).join(" ")}

			style={style}

			onFocus={e => {
				if (props.onFocus && typeof props.onFocus === "function") {
					props.onFocus(e)
				}
				dispatch({
					type: "FOCUS",
				})
			}}

			onBlur={e => {
				if (props.onBlur && typeof props.onBlur === "function") {
					props.onBlur(e)
				}
				dispatch({
					type: "BLUR",
				})
			}}

			onPointerDown={e => {
				isPointerDownRef.current = true
			}}

			onPointerMove={e => {
				if (!state.focused || !isPointerDownRef.current) {
					if (!state.focused && isPointerDownRef.current) {
						isPointerDownRef.current = false
					}
					return
				}
				try {
					const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				} catch (error) {
					console.error(`onPointerMove: error=${error}`)
				}
			}}

			onPointerUp={e => {
				isPointerDownRef.current = false
			}}

			// TODO: Add COMPAT guard for select-all or prevent
			// default?
			onSelect={e => {
				if (props.onSelect && typeof props.onSelect === "function") {
					props.onSelect(e)
				}
				try {
					const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				} catch (error) {
					console.error(`onSelect: error=${error}`)
				}
			}}

			// // TODO: e.nativeEvent.isComposing or
			// // "insert-text-composed" needs to negate
			// // state.rangeTypes because the insertion point is
			// // advanced during composition.
			// onKeyDown={e => {
			// 	if (props.onKeyDown && typeof props.onKeyDown === "function") {
			// 		props.onKeyDown(e)
			// 	}
			//
			// 	let formatType = ""
			// 	let text = ""
			// 	let deleteType = ""
			//
			// 	const keyDownType = keyDownTypeFor(e)
			// 	if (keyDownType) {
			// 		console.log(keyDownType)
			// 	}
			// 	switch (keyDownType) {
			// 	case "apply-format-plaintext":
			// 	case "apply-format-em":
			// 	case "apply-format-strong":
			// 	case "apply-format-code":
			// 	case "apply-format-strike":
			// 	case "apply-format-a":
			// 		e.preventDefault()
			// 		if (testForSelection(state)) {
			// 			formatType = keyDownType.slice("apply-format-".length)
			// 			const types = {}
			// 			if (formatType !== "plaintext") {
			// 				types[formatType] = {} // TODO
			// 			}
			// 			dispatch({
			// 				type: "APPLY_TYPES",
			// 				types,
			// 			})
			// 		}
			// 		break
			// 	case "apply-format-markdown-em":
			// 	case "apply-format-markdown-strong":
			// 	case "apply-format-markdown-code":
			// 	case "apply-format-markdown-strike":
			// 	case "apply-format-markdown-a":
			// 		if (testForSelection(state)) {
			// 			e.preventDefault()
			// 			formatType = keyDownType.slice("apply-format-markdown-".length)
			// 			const types = {}
			// 			if (formatType !== "plaintext") {
			// 				// types[formatType] = {}
			// 				types[formatType] = formatType !== "a" ? {} : {
			// 					href: "TODO",
			// 				}
			// 			}
			// 			dispatch({
			// 				type: "APPLY_TYPES",
			// 				types,
			// 			})
			// 		}
			// 		break
			// 	case "insert-text":
			// 		if (testForSelection(state)) {
			// 			e.preventDefault()
			// 			text = e.key
			// 			dispatch({
			// 				type: "INSERT_TEXT",
			// 				text,
			// 			})
			// 		}
			// 		break
			// 	case "insert-composed-text-unidentified":
			// 	case "insert-composed-text-identified":
			// 		if (testForSelection(state) && state.range.start.key !== state.range.end.key) {
			// 			e.preventDefault()
			// 			// COMPAT: e.preventDefault(...) on
			// 			// "insert-composed-text-unidentified" breaks
			// 			// composition and oncompositionend is never
			// 			// emitted. In Chrome 84, use of
			// 			// document.activeElement.blur(...) appears to
			// 			// emit oncompositionend.
			// 			const selection = document.getSelection()
			// 			if (selection.rangeCount) {
			// 				document.activeElement.blur()
			// 				const range = {
			// 					...state.range,
			// 					end: state.range.start,
			// 				}
			// 				setTimeout(() => {
			// 					const domRange = convertEditorRangeToDOMRange(range)
			// 					selection.addRange(domRange)
			// 				}, 0)
			// 			}
			// 			dispatch({
			// 				type: "INSERT_TEXT",
			// 				text: "",
			// 			})
			// 		}
			// 		break
			// 	case "insert-tab":
			// 		e.preventDefault()
			// 		text = "\t"
			// 		dispatch({
			// 			type: "INSERT_TEXT",
			// 			text,
			// 		})
			// 		break
			// 	case "insert-soft-paragraph":
			// 	case "insert-hard-paragraph":
			// 	case "insert-horizontal-rule":
			// 		e.preventDefault()
			// 		dispatch({
			// 			type: "INSERT_HARD_PARAGRAPH",
			// 		})
			// 		break
			// 	case "delete-rtl-rune":
			// 	case "delete-rtl-word":
			// 	case "delete-rtl-line":
			// 	case "delete-ltr-rune":
			// 	case "delete-ltr-word":
			// 		e.preventDefault()
			// 		deleteType = keyDownType.slice("delete-".length)
			// 		dispatch({
			// 			type: "DELETE",
			// 			deleteType,
			// 		})
			// 		break
			// 	case "undo":
			// 	case "redo":
			// 		e.preventDefault()
			// 		// TODO
			// 		break
			// 	default:
			// 		// No-op
			// 		break
			// 	}
			// }}

			// onCompositionEnd={e => {
			// 	if (props.onCompositionEnd && typeof props.onCompositionEnd === "function") {
			// 		props.onCompositionEnd(e)
			// 	}
			// 	const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
			// 	const children = parseRenderedChildren(document.getElementById(range.start.key))
			// 	dispatch({
			// 		type: "UNCONTROLLED_INPUT",
			// 		range,
			// 		children,
			// 		noopRender: false, // onCompositionEnd must rerender
			// 	})
			// }}

			// onInput={e => {
			// 	if (props.onInput && typeof props.onInput === "function") {
			// 		props.onInput(e)
			// 	}
			// 	const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
			// 	const children = parseRenderedChildren(document.getElementById(range.start.key))
			// 	dispatch({
			// 		type: "UNCONTROLLED_INPUT",
			// 		range,
			// 		children,
			// 		noopRender: e.nativeEvent.isComposing,
			// 	})
			// }}

			// onCut={e => {
			// 	if (props.onCut && typeof props.onCut === "function") {
			// 		props.onCut(e)
			// 	}
			// 	// ...
			// }}

			// onCopy={e => {
			// 	if (props.onCopy && typeof props.onCopy === "function") {
			// 		props.onCopy(e)
			// 	}
			// 	// ...
			// }}

			// onPaste={e => {
			// 	if (props.onPaste && typeof props.onPaste === "function") {
			// 		props.onPaste(e)
			// 	}
			// 	// ...
			// }}

			onDragStart={e => {
				e.preventDefault()
			}}

			contentEditable
			suppressContentEditableWarning
		/>
	)
}

const EditorWithDebugger = ({ state, dispatch, ...props }) => (
	<>
		<Editor
			state={state}
			dispatch={dispatch}
			{...props}
		/>
		{process.env.NODE_ENV !== "production" && (
			<pre className="mt-6 text-xs whitespace-pre-wrap break-words" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</pre>
		)}
	</>
)

export default EditorWithDebugger
