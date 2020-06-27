import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import * as Range from "./Range"
import detectKeyDownType from "./keydown/detectKeyDownType"
import keyDownTypesEnum from "./keydown/keyDownTypesEnum"
import must from "lib/must"
import noopTextNodeRerenders from "./noopTextNodeRerenders"
import React from "react"
import ReactDOM from "react-dom"
import Renderer from "./Renderer"
import Toolbar from "./Toolbar"
import useEditor from "./useEditor"

import "./Editor.css"

;(() => {
	noopTextNodeRerenders()
})()

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
				const ranges = Range.computeFromCursors(state.cursors)
				if (!ranges) { // range[0] === null || range[0] === -1) {
					// No-op
					return
				}
				const domRange = document.createRange()
				domRange.setStart(...ranges[0])
				domRange.setEnd(...ranges[1])
				domSelection.addRange(domRange)
			})
		}, [state, dispatch]),
		[state.shouldRender],
	)

	return (
		<div className="em-context">

			<article
				ref={ref}

				className="leading-relaxed focus:outline-none"

				onFocus={e => {
					dispatch.focus()
				}}

				onBlur={e => {
					dispatch.blur()
				}}

				onPointerDown={e => {
					pointerIsDownRef.current = true
					dispatch.setToolbarClientRect(null)
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

				// TODO: Add COMPAT guard for select-all? Or prevent
				// default?
				onSelect={e => {
					const cursors = Cursors.computeFromCurrentRange(ref.current)
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)

					let clientRect = null
					if (cursors[0].key === cursors[1].key && cursors[0].offset !== cursors[1].offset) {
						const selection = document.getSelection()
						if (!selection.rangeCount) {
							// No-op; defer to end
						} else {
							const range = selection.getRangeAt(0)
							clientRect = range.getBoundingClientRect()
						}
					}
					dispatch.setToolbarClientRect(clientRect)
				}}

				onKeyDown={e => {
					const keyDownType = detectKeyDownType(e)
					if (keyDownType) {
						console.log(keyDownType)
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
						// dispatch.formatEm()
						break
					case keyDownTypesEnum.formatStrong:
						e.preventDefault()
						// dispatch.formatStrong()
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
					const collapsed = must(Cursors.computeFromCurrentRange(ref.current))
					const domElementID = must(document.getElementById(collapsed[0].key))
					const element = Elements.parseFromDOMElement(domElementID)
					dispatch.input(element, collapsed)
				}}

				// onCut={e => {
				// 	e.preventDefault()
				// 	// TODO
				// }}
				//
				// onCopy={e => {
				// 	e.preventDefault()
				// 	// TODO
				// }}
				//
				// onPaste={e => {
				// 	e.preventDefault()
				// 	// TODO
				// }}

				onDragStart={e => {
					e.preventDefault()
				}}

				contentEditable
				suppressContentEditableWarning

				data-root
			/>

			<Toolbar clientRect={state.toolbarClientRect} />

			{/* Debugger */}
			{/* <div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}> */}
			{/* 	{JSON.stringify(state.toolbarClientRect, null, "\t")} */}
			{/* </div> */}

		</div>
	)
}

export default Editor
