// import * as Nodes from "./Nodes"
// import * as Spans from "./Spans"
// import { typeEnum } from "./components/typeMaps"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
import useEditor from "./useEditor"

const Editor = ({ children }) => {
	const ref = React.useRef(null)

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
