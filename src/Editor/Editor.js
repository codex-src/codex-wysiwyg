import * as keydown from "./keydown"
import * as Range from "./Range"
import * as Readers from "./Readers"
import * as Types from "./Types"
import filterTemplated from "lib/filterTemplated"
import React from "react"
import ReactDOM from "react-dom"
import useEditor from "./useEditor"
import useEditor2 from "./useEditor2"
import VirtualRange from "./classes/VirtualRange"

import "./Editor.css"

// React renderer for the current state.
const ReactRerenderer = ({ state, dispatch }) => (
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
	const [state2, dispatch2] = useEditor2()

	// Disables read-only mode on DOMContentLoaded.
	React.useEffect(() => {
		document.addEventListener("DOMContentLoaded", dispatch.DOMContentLoaded)
		return () => {
			document.removeEventListener("DOMContentLoaded", dispatch.DOMContentLoaded)
		}
	}, [dispatch])

	// Renders on state.shouldRender.
	React.useLayoutEffect(
		React.useCallback(() => {
			if (!ref.current) {
				// No-op
				return
			}

			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const domSelection = document.getSelection()
			if (domSelection.rangeCount) {
				domSelection.removeAllRanges()
			}
			ReactDOM.render(<ReactRerenderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				try {
					const domRange = Range.toDOMRange(state.range)
					domSelection.addRange(domRange)
				} catch (error) {
					console.error({
						range: state.range,
						error,
					})
				}
			})
		}, [state, dispatch]),
		[state.shouldRender],
	)

	// Exclusively returns a handler when
	// DOMContentLoaded=true and readOnlyMode=false.
	const newReadWriteHandler = handler => {
		if (!(state.DOMContentLoaded && !state.readOnlyMode)) {
			return undefined
		}
		return handler
	}

	return (
		<div>

			{/* DEBUG */}
			<div className="!mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify(state2, null, "\t")}
			</div>

			<article
				ref={ref}

				className={filterTemplated(`
					subpixel-antialiased

					em-context
					focus:outline-none
				`)}

				style={{
					MozTabSize: 4,
					tabSize: 4,
				}}

				onFocus={newReadWriteHandler(e => {
					dispatch.focus()
				})}

				onBlur={newReadWriteHandler(e => {
					dispatch.blur()
				})}

				onPointerDown={newReadWriteHandler(e => {
					pointerdownRef.current = true
				})}

				onPointerMove={newReadWriteHandler(e => {
					if (!state.focused) {
						pointerdownRef.current = false
						return
					}
					if (!pointerdownRef.current) {
						// No-op
						return
					}
					// TODO: Deprecate
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)

					const range2 = VirtualRange.computeCurrent(ref.current)
					if (!range2) {
						// No-op
						return
					}
					dispatch2({
						type: "SELECT",
						range: range2,
					})
				})}

				onPointerUp={newReadWriteHandler(e => {
					pointerdownRef.current = false
				})}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={newReadWriteHandler(e => {
					// TODO: Deprecate
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)

					const range2 = VirtualRange.computeCurrent(ref.current)
					if (!range2) {
						// No-op
						return
					}
					console.log(range2.toRange())
					dispatch2({
						type: "SELECT",
						range: range2,
					})
				})}

				onKeyDown={newReadWriteHandler(e => {
					const keydownT = keydown.detectType(e)
					if (keydownT) {
						console.log(keydownT)
					}
					switch (keydownT) {
					case keydown.enum.applyFormatPlaintext:
						e.preventDefault()
						dispatch.applyFormat("plaintext")
						return
					case keydown.enum.applyFormatEm:
						e.preventDefault()
						dispatch.applyFormat(Types.enum.em)
						return
					case keydown.enum.applyFormatStrong:
						e.preventDefault()
						dispatch.applyFormat(Types.enum.strong)
						return
					case keydown.enum.applyFormatCode:
						e.preventDefault()
						dispatch.applyFormat(Types.enum.code)
						return
					case keydown.enum.applyFormatStrike:
						e.preventDefault()
						dispatch.applyFormat(Types.enum.strike)
						return
					case keydown.enum.applyFormatA:
						e.preventDefault()
						dispatch.applyFormat(Types.enum.a, { href: "https://google.com" })
						return

						// case keydown.enum.insertTextTab:
						// 	e.preventDefault()
						// 	dispatch.insertText("\t", "text/plain") // TODO
						// 	return
						// case keydown.enum.insertTextEnter:
						// 	e.preventDefault()
						// 	// TODO: Add insertParagraph?
						// 	dispatch.insertText("\n", "text/plain") // TODO
						// 	return

					case keydown.enum.insertText:
						if (state.range.collapsed) {
							// No-op
							return
						}
						e.preventDefault()
						// dispatch.insertText()
						return

					case keydown.enum.deleteRTLRune:
						e.preventDefault()
						dispatch.delete("rtl", "rune")
						return
					case keydown.enum.deleteRTLWord:
						e.preventDefault()
						dispatch.delete("rtl", "word")
						return
					case keydown.enum.deleteRTLLine:
						e.preventDefault()
						dispatch.delete("rtl", "line")
						return
					case keydown.enum.deleteLTRRune:
						e.preventDefault()
						dispatch.delete("ltr", "rune")
						return
					case keydown.enum.deleteLTRWord:
						e.preventDefault()
						dispatch.delete("ltr", "word")
						return

						// case keydown.enum.undo:
						// 	e.preventDefault()
						// 	dispatch.undo()
						// 	return
						// case keydown.enum.redo:
						// 	e.preventDefault()
						// 	dispatch.redo()
						// 	return

					default:
						// No-op
						break
					}
				})}

				onInput={newReadWriteHandler(e => {
					const collapsed = Range.collapse(Range.compute(ref.current)) // Takes precedence
					const spans = Readers.rendered.spans(document.getElementById(collapsed[0].key))
					dispatch.uncontrolledInputHandler(spans, collapsed)
				})}

				onCut={newReadWriteHandler(e => {
					e.preventDefault()
					// TODO: e.clipboardData.setData("text/plain", ...)
				})}

				onCopy={newReadWriteHandler(e => {
					e.preventDefault()
					// TODO: e.clipboardData.setData("text/plain", ...)
				})}

				onPaste={newReadWriteHandler(e => {
					e.preventDefault()
					// TODO: e.clipboardData.getData("text/plain")
				})}

				onDragStart={newReadWriteHandler(e => {
					e.preventDefault()
				})}

				contentEditable={state.DOMContentLoaded && !state.readOnlyMode}
				suppressContentEditableWarning={state.DOMContentLoaded && !state.readOnlyMode}
			/>

			{/* DEBUG */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify({
					...state,
					// elements: undefined,
				}, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
