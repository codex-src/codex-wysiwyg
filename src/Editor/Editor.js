import componentMap from "./components/componentMap"
import keyDownTypeFor from "./keyDownTypeFor"
import React from "react"
import ReactDOM from "react-dom"
import testForSelection from "./useEditor/testForSelection"

import { // Unsorted
	initElementsFromChildren,
	parseRenderedChildren,
} from "./parsers"

import { // Unsorted
	getCurrentRange,
	convRangeToUserLiteral,
} from "./Range"

import "./Editor.css"

const MemoElements = React.memo(({ elements }) => (
	elements.map(each => (
		React.createElement(componentMap[each.type], {
			...each.props,
			key: each.key, // For React
			id:  each.key, // For the DOM
		})
	))
))

// Renders a read-write editor.
const Editor = ({ id, className, style, state, dispatch, children }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	// Mounts elements from props.children (once).
	React.useLayoutEffect(
		React.useCallback(() => {
			const elements = initElementsFromChildren(children)
			dispatch({
				type: "MOUNT",
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
			ReactDOM.render(
				<MemoElements elements={state.elements} />,
				ref.current,
				() => {
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
				},
			)
		}, [state]),
		[state.shouldRerender],
	)

	return (
		<article
			ref={ref}

			id={id}
			className={`em-context ${className}`.trim()}
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
				try {
					const range = getCurrentRange(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				} catch (error) {
					console.error(error)
				}
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
					const types = {}
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
						const types = {}
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
			}}

			// onCompositionEnd={e => {
			// 	// ...
			// }}

			onInput={e => {
				const range = getCurrentRange(ref.current)
				const children = parseRenderedChildren(document.getElementById(range.start.key))
				dispatch({
					type: "UNCONTROLLED_INPUT",
					range,
					children,
					preventRerender: e.nativeEvent.isComposing,
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

			contentEditable={state.mounted}
			suppressContentEditableWarning={state.mounted}

			data-root
		/>
	)
}

// {process.env.NODE_ENV !== "production" && (
// 	<pre className="mt-6 text-xs whitespace-pre-wrap break-words" style={tabSize(2)}>
// 		{JSON.stringify(state, null, "\t")}
// 	</pre>
// )}

export default Editor
