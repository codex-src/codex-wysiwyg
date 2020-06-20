import * as Cursors from "./Cursors"
import * as Nodes from "./Nodes"
import detectKeyDownType from "./keydown/detectKeyDownType"
import keyDownTypesEnum from "./keydown/keyDownTypesEnum"
import noopTextContent from "./noopTextContent"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
import useEditor from "./useEditor"
import { typeEnum } from "./components/typeMaps"

import "./Editor.css"

;(() => {
	noopTextContent()
})()

const Editor = ({ children }) => {
	const ref = React.useRef(null)
	const pointerIsDownRef = React.useRef(false)

	const [state, dispatch] = useEditor(children)

	React.useLayoutEffect(() => {
		// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
		const selection = document.getSelection()
		if (selection.rangeCount) {
			selection.removeAllRanges()
		}
		ReactDOM.render(<ReactRenderer>{state.nodes}</ReactRenderer>, ref.current, () => {
			// if (!state.focused) {
			// 	// No-op
			// 	return
			// }
			// const range = computeDOMRange(state.cursors[0])
			// try {
			// 	const domRange = document.createRange()
			// 	domRange.setStart(range.container, range.offset)
			// 	domRange.collapse()
			// 	selection.addRange(domRange)
			// } catch (error) {
			// 	console.error(error)
			// }
		})
	}, [state.nodes])

	return (
		<div>

			{/* {children} */}

			<article
				ref={ref}

				className="whitespace-pre-wrap focus:outline-none"

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
					const cursors = Cursors.computeFromCurrentRange()
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
					const cursors = Cursors.computeFromCurrentRange()
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)
				}}

				onKeyDown={e => {
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
						console.log("backspaceLine")
						break
					case keyDownTypesEnum.backspaceWord:
						e.preventDefault()
						console.log("backspaceWord")
						break
					case keyDownTypesEnum.backspaceRune:
						e.preventDefault()
						console.log("backspaceRune")
						break
					case keyDownTypesEnum.forwardBackspaceWord:
						e.preventDefault()
						console.log("forwardBackspaceWord")
						break
					case keyDownTypesEnum.forwardBackspaceRune:
						e.preventDefault()
						console.log("forwardBackspaceRune")
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
					const cursors = Cursors.computeFromCurrentRange()
					if (!cursors) {
						throw new Error("onInput: no such cursors")
					}
					const id = cursors[0].key
					const domIDElement = document.getElementById(id)
					if (!domIDElement) {
						// eslint-disable-next-line quotes
						throw new Error(`onInput: no such id (id=${id || `""`})`)
					}

					// Parses a DOM ID element.
					const parseDOMIDElement = domIDElement => {
						const node = Nodes.construct()

						// Get the current type:
						const type = typeEnum[domIDElement.nodeName.toLowerCase()]
						if (!type) {
							// eslint-disable-next-line quotes
							throw new Error(`parseDOMIDElement: no such type (type=${type || `""`})`)
						}
						node.type = type
						// Get the current key:
						const key = domIDElement.getAttribute("id")
						if (!key) {
							// eslint-disable-next-line quotes
							throw new Error(`parseDOMIDElement: no such key (key=${key || `""`})`)
						}
						node.key = key
						// Get the current spans:
						const spans = []
						const recurse = (onDOMNode, types = [], props = {}) => {
							if (onDOMNode.nodeType === Node.TEXT_NODE) {
								spans.push({
									types,
									...{
										...props,
										children: onDOMNode.nodeValue,
									},
								})
								return
							}
							for (const each of onDOMNode.childNodes) {
								// Get the next types and type-props:
								const nextTypes = [...types]
								const nextProps = { ...props } // TODO
								if (each.nodeType === Node.ELEMENT_NODE) {
									const type = typeEnum[each.nodeName.toLowerCase()]
									if (!type) {
										// eslint-disable-next-line quotes
										throw new Error(`parseDOMIDElement.recurse: no such type (type=${type || `""`})`)
									}
									nextTypes.push(type)
									nextProps[type] = JSON.parse(each.getAttribute("data-props") || "{}")
								}
								recurse(each, nextTypes, nextProps)
							}
						}
						recurse(domIDElement)
						console.log(spans)
						// console.log(domIDElement, node)
					}

					parseDOMIDElement(domIDElement)
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
			<div className="mt-6 whitespace-pre text-xs font-mono" style={{ tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
