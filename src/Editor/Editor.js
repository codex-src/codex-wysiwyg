import * as keydown from "./keydown"
import * as Range from "./Range"
import * as Readers from "./Readers"
import * as Types from "./Types"
import classNameString from "lib/classNameString"
import React from "react"
import ReactDOM from "react-dom"
import useEditor from "./useEditor"

const ReactRerenderer = ({ state, dispatch }) => (
	state.elements.map(({ type: T, key, props }) => (
		React.createElement(Types.components[T], {
			key,
			id: key,
			...props,
		})
	))
)

const Editor = ({ markup, children }) => {
	const ref = React.useRef(null)

	// Tracks whether the "pointerdown" event is active.
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor({ markup, children })

	React.useLayoutEffect(
		React.useCallback(() => {
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
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.shouldRerender],
	)

	return (
		<div>

			<article
				ref={ref}

				className={classNameString(`
					subpixel-antialiased

					em-context
					focus:outline-none
				`)}

				style={{
					MozTabSize: 4,
					tabSize: 4,
				}}

				onFocus={e => {
					dispatch.focus()
				}}

				onBlur={e => {
					dispatch.blur()
				}}

				onPointerDown={e => {
					pointerdownRef.current = true
				}}

				onPointerMove={e => {
					if (!state.focused) {
						pointerdownRef.current = false
						return
					}
					if (!pointerdownRef.current) {
						// No-op
						return
					}
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				}}

				onPointerUp={e => {
					pointerdownRef.current = false
				}}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={e => {
					const range = Range.compute(ref.current)
					if (!range) {
						// No-op
						return
					}
					dispatch.select(range)
				}}

				onKeyDown={e => {
					// const type = keydown.detectType(e)
					// if (type) { // DEBUG
					// 	console.log(type)
					// }
					switch (keydown.detectType(e)) {
					/*
					 * Format
					 */
					case keydown.enum.formatEm:
						e.preventDefault()
						dispatch.format(Types.enum.em)
						return
					case keydown.enum.formatStrong:
						e.preventDefault()
						dispatch.format(Types.enum.strong)
						return
					case keydown.enum.formatStrike:
						e.preventDefault()
						dispatch.format(Types.enum.strike)
						return
					case keydown.enum.formatCode:
						e.preventDefault()
						dispatch.format(Types.enum.code)
						return
					case keydown.enum.formatA:
						e.preventDefault()
						dispatch.format(Types.enum.a, { href: "https://google.com" })
						return
					/*
					 * Character data
					 */
					case keydown.enum.tab:
						e.preventDefault()
						dispatch.write("\t")
						return
					case keydown.enum.enter:
						e.preventDefault()
						return
					case keydown.enum.characterData:
						if (!state.range.collapsed) {
							e.preventDefault()
							// TODO
							return
						}
						return
					case keydown.enum.characterDataDead:
						e.preventDefault()
						return
					/*
					 * Backspace
					 */
					case keydown.enum.backspaceRTLRune:
						e.preventDefault()
						return
					case keydown.enum.backspaceRTLWord:
						e.preventDefault()
						return
					case keydown.enum.backspaceRTLLine:
						e.preventDefault()
						return
					case keydown.enum.backspaceLTRRune:
						e.preventDefault()
						return
					case keydown.enum.backspaceLTRWord:
						e.preventDefault()
						return
					/*
					 * Undo, redo
					 */
					case keydown.enum.undo:
						e.preventDefault()
						return
					case keydown.enum.redo:
						e.preventDefault()
						return
					default:
						// No-op
						break
					}
				}}

				onInput={e => {
					const collapsed = Range.collapse(Range.compute(ref.current)) // Takes precedence
					const spans = Readers.react.spans(document.getElementById(collapsed[0].key))
					dispatch.input(spans, collapsed)
				}}

				onCut={e => {
					e.preventDefault()
				}}

				onCopy={e => {
					e.preventDefault()
				}}

				onPaste={e => {
					e.preventDefault()
				}}

				onDragStart={e => {
					e.preventDefault()
				}}

				contentEditable
				suppressContentEditableWarning
			/>

			{/* Debugger */}
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
