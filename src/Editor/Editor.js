import * as Elements from "./Elements"
import * as Range from "./Range"
import * as Selection from "./Selection"
import detectKeyDownType from "./keydown/detectKeyDownType"
import keyDownTypesEnum from "./keydown/keyDownTypesEnum"
import noopTextNodeRerenders from "./noopTextNodeRerenders"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
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
			ReactDOM.render(<ReactRenderer elements={state.elements} />, ref.current, () => {
				if (!state.focused) {
					// No-op
					return
				}
				try {
					const domRange = document.createRange()
					const range = Range.computeFromCursor(state.selection[0])
					domRange.setStart(range.container, range.offset)
					domRange.collapse()
					domSelection.addRange(domRange)
				} catch (error) {
					console.error(error)
				}
			})
		}, [state]),
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
					const selection = Selection.computeFromCurrentRange()
					if (!selection) {
						// No-op
						return
					}
					dispatch.select(selection)
				}}

				onPointerUp={e => {
					pointerIsDownRef.current = false
				}}

				onSelect={e => {
					const selection = Selection.computeFromCurrentRange()
					if (!selection) {
						// No-op
						return
					}
					dispatch.select(selection)
				}}

				onKeyDown={e => {
					// console.log(detectKeyDownType(e))
					switch (detectKeyDownType(e)) {
					case keyDownTypesEnum.characterData:
						if (!state.collapsed) {
							e.preventDefault()
							console.log("characterData")
							return
						}
						break
					case keyDownTypesEnum.characterDataDead:
						e.preventDefault()
						console.log("characterDataDead")
						break
					case keyDownTypesEnum.tab:
						e.preventDefault()
						console.log("tab")
						break
					case keyDownTypesEnum.enter:
						e.preventDefault()
						console.log("enter")
						break
					case keyDownTypesEnum.formatEm:
						e.preventDefault()
						console.log("formatEm")
						break
					case keyDownTypesEnum.formatStrong:
						e.preventDefault()
						console.log("formatStrong")
						break
					case keyDownTypesEnum.backspaceLine:
						e.preventDefault()
						dispatch.backspaceLine()
						break
					case keyDownTypesEnum.backspaceWord:
						e.preventDefault()
						dispatch.backspaceWord()
						break
					case keyDownTypesEnum.backspaceRune:
						e.preventDefault()
						dispatch.backspaceRune()
						break
					case keyDownTypesEnum.forwardBackspaceWord:
						e.preventDefault()
						dispatch.forwardBackspaceWord()
						break
					case keyDownTypesEnum.forwardBackspaceRune:
						e.preventDefault()
						dispatch.forwardBackspaceRune()
						break
					case keyDownTypesEnum.undo:
						e.preventDefault()
						console.log("undo")
						break
					case keyDownTypesEnum.redo:
						e.preventDefault()
						console.log("redo")
						break
					default:
						// No-op
						break
					}
				}}

				onInput={e => {
					const selection = Selection.computeFromCurrentRange()
					if (!selection) {
						throw new Error("onInput: no such selection")
					}
					const domElement = document.getElementById(selection[0].key)
					if (!domElement) {
						throw new Error("onInput: no such element")
					}
					const element = Elements.parseFromDOMElement(domElement)
					dispatch.input(element, [selection[0], selection[0]])
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
