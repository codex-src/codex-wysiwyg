import React from "react"
import ReactDOM from "react-dom"

import {
	computeEditorRangeFromCurrentDOMRange,
	convertEditorRangeToDOMRange,
} from "./model/Range"

// const MemoElements = React.memo(({ elements }) => (
// 	elements.map(each => (
// 		React.createElement(componentMap[each.type], {
// 			...each.props,
// 			key: each.key, // For React
// 			id:  each.key, // For the DOM
// 		})
// 	))
// ))

const Paragraph = ({ children }) => (
	<p>
		{children || (
			<br />
		)}
	</p>
)

const Render = ({ renderable }) => (
	renderable.map(each => (
		React.createElement(Paragraph /* componentMap[each.type] */, {
			...each.props,
			key: each.key, // React key
			id:  each.key, // DOM ID
		})
	))
)

const Editor = ({
	id,
	className,
	style,

	state,
	dispatch,
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
				<Render renderable={state.renderable} />,
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
			className={["em-context", className].filter(Boolean).join(" ")}
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
				// isPointerDownRef.current = true
			}}

			onPointerMove={e => {
				// if (!state.focused || !isPointerDownRef.current) {
				// 	if (!state.focused && isPointerDownRef.current) {
				// 		isPointerDownRef.current = false
				// 	}
				// 	return
				// }
				// const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
				// if (!range) {
				// 	// No-op
				// 	return
				// }
				// // dispatch({
				// // 	type: "SELECT",
				// // 	range,
				// // })
			}}

			// onPointerUp={e => {
			// 	isPointerDownRef.current = false
			// }}

			// TODO: Add COMPAT guard for select-all or prevent
			// default?
			onSelect={e => {
				try {
					const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
					if (!range) {
						// No-op
						return
					}
					console.log(range)

					// dispatch({
					// 	type: "SELECT",
					// 	range,
					// })
				} catch (error) {
					console.error(`onSelect: error=${error}`)
				}
			}}

			onKeyDown={e => {
			//  let formatType = ""
			//  let text = ""
			//  let deleteType = ""
			//
			//  const keyDownType = keyDownTypeFor(e)
			//  if (keyDownType) {
			//  	console.log(keyDownType)
			//  }
			//
			//  switch (keyDownType) {
			//  case "apply-format-plaintext":
			//  case "apply-format-em":
			//  case "apply-format-strong":
			//  case "apply-format-code":
			//  case "apply-format-strike":
			//  case "apply-format-a":
			//  	// NOTE: Formatting events must always be
			//  	// prevented.
			//  	e.preventDefault()
			//  	if (testForSelection(state)) {
			//  		formatType = keyDownType.slice("apply-format-".length)
			//  		const types = {}
			//  		if (formatType !== "plaintext") {
			//  			types[formatType] = {} // TODO
			//  		}
			//  		dispatch({
			//  			type: "APPLY_TYPES",
			//  			types,
			//  		})
			//  	}
			//  	break
			//  case "apply-format-markdown-em":
			//  case "apply-format-markdown-strong":
			//  case "apply-format-markdown-code":
			//  case "apply-format-markdown-strike":
			//  case "apply-format-markdown-a":
			//
			//  	// // NOTE: Formatting events must always be
			//  	// // prevented.
			//  	// e.preventDefault()
			//
			//  	if (testForSelection(state)) {
			//  		e.preventDefault()
			//  		formatType = keyDownType.slice("apply-format-markdown-".length)
			//  		const types = {}
			//  		if (formatType !== "plaintext") {
			//  			// types[formatType] = {}
			//  			types[formatType] = formatType !== "a" ? {} : {
			//  				harticleRef: "TODO",
			//  			}
			//  		}
			//  		dispatch({
			//  			type: "APPLY_TYPES",
			//  			types,
			//  		})
			//  	}
			//  	break
			//  case "insert-text":
			//  	if (testForSelection(state)) {
			//  		e.preventDefault()
			//  		text = e.key
			//  		dispatch({
			//  			type: "INSERT_TEXT",
			//  			text,
			//  		})
			//  	}
			//  	break
			//  case "insert-composed-text-unidentified":
			//  case "insert-composed-text-identified":
			//  	if (testForSelection(state) && state.range.start.key !== state.range.end.key) {
			//  		e.preventDefault()
			//  		// COMPAT: e.preventDefault(...) on
			//  		// "insert-composed-text-unidentified" breaks
			//  		// composition and oncompositionend is never
			//  		// emitted. In Chrome 84, use of
			//  		// document.activeElement.blur(...) appears to
			//  		// emit oncompositionend.
			//  		const selection = document.getSelection()
			//  		if (selection.rangeCount) {
			//  			document.activeElement.blur()
			//  			const range = {
			//  				...state.range,
			//  				end: state.range.start,
			//  			}
			//  			setTimeout(() => {
			//  				const domRange = convertEditorRangeToDOMRange(range)
			//  				selection.addRange(domRange)
			//  			}, 0)
			//  		}
			//  		dispatch({
			//  			type: "INSERT_TEXT",
			//  			text: "",
			//  		})
			//  	}
			//  	break
			//  case "insert-tab":
			//  	e.preventDefault()
			//  	text = "\t"
			//  	dispatch({
			//  		type: "INSERT_TEXT",
			//  		text,
			//  	})
			//  	break
			//  case "insert-soft-paragraph":
			//  case "insert-hard-paragraph":
			//  case "insert-horizontal-rule":
			//  	e.preventDefault()
			//  	dispatch({
			//  		type: "INSERT_HARD_PARAGRAPH",
			//  	})
			//  	break
			//  case "delete-rtl-rune":
			//  case "delete-rtl-word":
			//  case "delete-rtl-line":
			//  case "delete-ltr-rune":
			//  case "delete-ltr-word":
			//  	e.preventDefault()
			//  	deleteType = keyDownType.slice("delete-".length)
			//  	dispatch({
			//  		type: "DELETE",
			//  		deleteType,
			//  	})
			//  	break
			//  case "undo":
			//  case "redo":
			//  	e.preventDefault()
			//  	// TODO
			//  	break
			//  default:
			//  	// No-op
			//  	break
			//  }
			}}

			onCompositionEnd={e => {
				// const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
				// const children = parseRenderedChildren(document.getElementById(range.start.key))
				// dispatch({
				// 	type: "UNCONTROLLED_INPUT",
				// 	range,
				// 	children,
				// 	noopRender: false, // onCompositionEnd must rerender
				// })
			}}

			onInput={e => {
				// const range = computeEditorRangeFromCurrentDOMRange(articleRef.current)
				// const children = parseRenderedChildren(document.getElementById(range.start.key))
				// dispatch({
				// 	type: "UNCONTROLLED_INPUT",
				// 	range,
				// 	children,
				// 	noopRender: e.nativeEvent.isComposing,
				// })
			}}

			// onCut={e => {
			// 	// TODO
			// }}

			// onCopy={e => {
			// // TODO
			// }}

			// onPaste={e => {
			// 	// TODO
			// }}

			onDragStart={e => {
				e.preventDefault()
			}}

			contentEditable
			suppressContentEditableWarning

			data-codex-root
		/>
	)
}

const tabSize = n => ({
	MozTabSize: n,
	tabSize: n,
})

const EditorWithDebugger = ({ state, dispatch, ...props }) => (
	<>
		<Editor
			state={state}
			dispatch={dispatch}
			{...props}
		/>
		{process.env.NODE_ENV !== "production" && (
			<pre className="mt-6 text-xs whitespace-pre-wrap break-words" style={tabSize(2)}>
				{JSON.stringify(state, null, "\t")}
			</pre>
		)}
	</>
)

export default EditorWithDebugger
