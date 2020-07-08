import * as keydown from "./keydown"
import * as Readers from "./Readers"
import * as Types from "./Types"
import React from "react"
import ReactDOM from "react-dom"
import useDOMContentLoaded from "lib/useDOMContentLoaded"
import useEditor from "./useEditor2"
import SyntheticRange from "./useEditor2/model/SyntheticRange"

import "./Editor.css"

// React renderer for the current state.
const ReactRenderer = ({ state, dispatch }) => (
	state.elements.map(({ type: T, key, props }) => (
		React.createElement(Types.components[T], {
			key,
			id: key, // Propagate key as id
			...props,
		})
	))
)

const Editor = ({ markup, children }) => {
	const ref = React.useRef(null)
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor({ markup, children })

	// Disables read-only mode on DOMContentLoaded.
	const DOMContentLoaded = useDOMContentLoaded()
	React.useEffect(() => {
		if (!DOMContentLoaded) {
			// No-op
			return
		}
		dispatch({ type: "DISABLE_READ_ONLY_MODE" })
	}, [DOMContentLoaded, dispatch])

	// Renders on state.shouldRender.
	React.useLayoutEffect(
		React.useCallback(() => {
			if (!ref.current) {
				// No-op
				return
			}
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(<ReactRenderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				// try {
				const range = state.range.toRange(state.range)
				selection.addRange(range)
				// } catch (error) {
				// 	console.error(error)
				// }
			})
		}, [state, dispatch]),
		[state.shouldRender],
	)

	// Returns a handler when state.readOnlyModeEnabled=false.
	const readWriteHandler = handler => {
		if (state.readOnlyModeEnabled) {
			return undefined
		}
		return handler
	}

	return (
		<div>

			<article
				ref={ref}

				className="subpixel-antialiased em-context focus:outline-none"

				style={{
					MozTabSize: 4,
					tabSize: 4,
				}}

				onFocus={readWriteHandler(e => {
					dispatch({ type: "FOCUS" })
				})}

				onBlur={readWriteHandler(e => {
					dispatch({ type: "BLUR" })
				})}

				onPointerDown={readWriteHandler(e => {
					pointerdownRef.current = true
				})}

				onPointerMove={readWriteHandler(e => {
					if (!state.focused) {
						pointerdownRef.current = false
						return
					}
					if (!pointerdownRef.current) {
						// No-op
						return
					}
					const range = SyntheticRange.getCurrent(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				})}

				onPointerUp={readWriteHandler(e => {
					pointerdownRef.current = false
				})}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={readWriteHandler(e => {
					const range = SyntheticRange.getCurrent(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch({
						type: "SELECT",
						range,
					})
				})}

				//				onKeyDown={readWriteHandler(e => {
				//					const keydownT = keydown.detectType(e)
				//					if (keydownT) {
				//						console.log(keydownT)
				//					}
				//					switch (keydownT) {
				//					case keydown.enum.applyFormatPlaintext:
				//						e.preventDefault()
				//						dispatch.applyFormat("plaintext")
				//						return
				//					case keydown.enum.applyFormatEm:
				//						e.preventDefault()
				//						dispatch.applyFormat(Types.enum.em)
				//						return
				//					case keydown.enum.applyFormatStrong:
				//						e.preventDefault()
				//						dispatch.applyFormat(Types.enum.strong)
				//						return
				//					case keydown.enum.applyFormatCode:
				//						e.preventDefault()
				//						dispatch.applyFormat(Types.enum.code)
				//						return
				//					case keydown.enum.applyFormatStrike:
				//						e.preventDefault()
				//						dispatch.applyFormat(Types.enum.strike)
				//						return
				//					case keydown.enum.applyFormatA:
				//						e.preventDefault()
				//						dispatch.applyFormat(Types.enum.a, { href: "https://google.com" })
				//						return
				//
				//						// case keydown.enum.insertTextTab:
				//						// 	e.preventDefault()
				//						// 	dispatch.insertText("\t", "text/plain") // TODO
				//						// 	return
				//						// case keydown.enum.insertTextEnter:
				//						// 	e.preventDefault()
				//						// 	// TODO: Add insertParagraph?
				//						// 	dispatch.insertText("\n", "text/plain") // TODO
				//						// 	return
				//
				//					case keydown.enum.insertText:
				//						if (state.range.collapsed) {
				//							// No-op
				//							return
				//						}
				//						e.preventDefault()
				//						// dispatch.insertText()
				//						return
				//
				//					case keydown.enum.deleteRTLRune:
				//						e.preventDefault()
				//						dispatch.delete("rtl", "rune")
				//						return
				//					case keydown.enum.deleteRTLWord:
				//						e.preventDefault()
				//						dispatch.delete("rtl", "word")
				//						return
				//					case keydown.enum.deleteRTLLine:
				//						e.preventDefault()
				//						dispatch.delete("rtl", "line")
				//						return
				//					case keydown.enum.deleteLTRRune:
				//						e.preventDefault()
				//						dispatch.delete("ltr", "rune")
				//						return
				//					case keydown.enum.deleteLTRWord:
				//						e.preventDefault()
				//						dispatch.delete("ltr", "word")
				//						return
				//
				//						// case keydown.enum.undo:
				//						// 	e.preventDefault()
				//						// 	dispatch.undo()
				//						// 	return
				//						// case keydown.enum.redo:
				//						// 	e.preventDefault()
				//						// 	dispatch.redo()
				//						// 	return
				//
				//					default:
				//						// No-op
				//						break
				//					}
				//				})}
				//
				//				onInput={readWriteHandler(e => {
				//					const collapsed = Range.collapse(Range.compute(ref.current)) // Takes precedence
				//					const spans = Readers.rendered.spans(document.getElementById(collapsed[0].key))
				//					dispatch.uncontrolledInputHandler(spans, collapsed)
				//				})}
				//
				//				onCut={readWriteHandler(e => {
				//					e.preventDefault()
				//					// TODO: e.clipboardData.setData("text/plain", ...)
				//				})}
				//
				//				onCopy={readWriteHandler(e => {
				//					e.preventDefault()
				//					// TODO: e.clipboardData.setData("text/plain", ...)
				//				})}
				//
				//				onPaste={readWriteHandler(e => {
				//					e.preventDefault()
				//					// TODO: e.clipboardData.getData("text/plain")
				//				})}
				//
				//				onDragStart={readWriteHandler(e => {
				//					e.preventDefault()
				//				})}

				contentEditable={!state.readOnlyModeEnabled}
				suppressContentEditableWarning={!state.readOnlyModeEnabled}
			/>

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
