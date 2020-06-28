import * as keydown from "./keydown"
import * as Range from "./Range"
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
					switch (keydown.detect(e)) {
					case keydown.enumerated.characterData:
						if (!state.range.collapsed) {
							e.preventDefault()
							// TODO
							return
						}
						break
					case keydown.enumerated.characterDataDead:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.tab:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.enter:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.formatEm:
						e.preventDefault()
						// // TODO
						break
					case keydown.enumerated.formatStrong:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.backspaceRTLRune:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.backspaceRTLWord:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.backspaceRTLLine:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.backspaceLTRRune:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.backspaceLTRWord:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.undo:
						e.preventDefault()
						// TODO
						break
					case keydown.enumerated.redo:
						e.preventDefault()
						// TODO
						break
					default:
						// No-op
						break
					}
				}}

				onInput={e => {
					// ...
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
					elements: undefined,
				}, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
