// import * as Nodes from "./Nodes"
// import * as Spans from "./Spans"
// import { typeEnum } from "./components/typeMaps"
import * as Cursors from "./Cursors"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
import useEditor from "./useEditor"

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
						pointerIsDownRef.current = false // Reset
					} else if (!pointerIsDownRef.current) {
						// No-op
						return
					}
					const cursors = Cursors.compute()
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)
				}}

				onPointerUp={e => {
					pointerIsDownRef.current = false // Reset
				}}

				onSelect={e => {
					const cursors = Cursors.compute()
					if (!cursors) {
						// No-op
						return
					}
					dispatch.select(cursors)
				}}

				onKeyDown={e => {
					// TODO
				}}

				onInput={e => {
					// TODO
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
