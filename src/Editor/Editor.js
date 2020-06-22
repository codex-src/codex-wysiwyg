import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Range from "./Range"
import detectKeyDownType from "./keydown/detectKeyDownType"
import keyDownTypesEnum from "./keydown/keyDownTypesEnum"
import noopTextNodeRerenders from "./noopTextNodeRerenders"
import React from "react"
import ReactDOM from "react-dom"
import useEditor from "./useEditor"
import { typeMap } from "./components/typeMaps"

import "./Editor.css"

;(() => {
	// No-ops redundant text node rerenders.
	noopTextNodeRerenders()
})()

const Renderer = ({ state, dispatch }) => (
	// <FocusedContext.Provider value={state.focused}>
	state.elements.map(({ type: T, key, props }) => (
		// NOTE: React reserves "key"; uses "id".
		React.createElement(typeMap[T], {
			key,
			id: key,
			...props,
		})
	))
	// </FocusedContext.Provider>
)


const Editor = ({ children }) => {
	const ref = React.useRef(null)
	const pointerIsDownRef = React.useRef(false)

	const [state, dispatch] = useEditor(children)

	React.useLayoutEffect(
		React.useCallback(() => {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const domSelection = document.getSelection()
			if (domSelection.rangeCount) {
				domSelection.removeAllRanges()
			}
			ReactDOM.render(<Renderer state={state} dispatch={dispatch} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				try {
					const domRange = document.createRange()
					const range = Range.computeFromCursor(state.cursors[0])
					domRange.setStart(range.container, range.offset)
					domRange.collapse()
					domSelection.addRange(domRange)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state, dispatch]),
		[state.elements],
	)

	return (
		<div>

			<article
				ref={ref}

				className="focus:outline-none"

				onFocus={e => {
					dispatch.focus()
				}}

				onBlur={e => {
					dispatch.blur()
				}}

				onPointerDown={e => {
					pointerIsDownRef.current = true
				}}

				onPointerMove={e => {
					if (!state.focused) {
						pointerIsDownRef.current = false
					} else if (!pointerIsDownRef.current) {
						// No-op
						return
					}
					const cursors = Cursors.computeFromCurrentRange(ref.current)
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)
				}}

				onPointerUp={e => {
					pointerIsDownRef.current = false
				}}

				onSelect={e => {
					const cursors = Cursors.computeFromCurrentRange(ref.current)
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)
				}}

				onKeyDown={e => {
					const keyDownType = detectKeyDownType(e)
					if (keyDownType) {
						console.log({ keyDownType })
					}
					switch (keyDownType) {
					case keyDownTypesEnum.characterData:
						if (!state.cursors.collapsed) {
							e.preventDefault()
							// TODO
							return
						}
						break
					case keyDownTypesEnum.characterDataDead:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.tab:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.enter:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.formatEm:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.formatStrong:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.backspaceRTLRune:
						e.preventDefault()
						dispatch.backspaceRTLRune()
						break
					case keyDownTypesEnum.backspaceRTLWord:
						e.preventDefault()
						dispatch.backspaceRTLWord()
						break
					case keyDownTypesEnum.backspaceRTLLine:
						e.preventDefault()
						dispatch.backspaceRTLLine()
						break
					case keyDownTypesEnum.backspaceLTRRune:
						e.preventDefault()
						dispatch.backspaceLTRRune()
						break
					case keyDownTypesEnum.backspaceLTRWord:
						e.preventDefault()
						dispatch.backspaceLTRWord()
						break
					case keyDownTypesEnum.undo:
						e.preventDefault()
						// TODO
						break
					case keyDownTypesEnum.redo:
						e.preventDefault()
						// TODO
						break
					default:
						// No-op
						break
					}
				}}

				onInput={e => {
					const cursors = Cursors.computeFromCurrentRange(ref.current)
					if (!cursors) {
						throw new Error("onInput: no such cursors")
					}
					const collapsed = Cursors.collapse(cursors)
					const domElement = document.getElementById(collapsed[0].key)
					if (!domElement) {
						throw new Error("onInput: no such element")
					}
					const element = Elements.parseFromDOMElement(domElement)
					dispatch.input(element, collapsed)
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
				}}

				contentEditable
				suppressContentEditableWarning

				data-codex-root
			/>

			{/* Debugger */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
