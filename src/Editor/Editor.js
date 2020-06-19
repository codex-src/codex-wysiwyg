import * as Nodes from "./Nodes"
import * as Spans from "./Spans"
import React from "react"
import ReactDOM from "react-dom"
import ReactRenderer from "./ReactRenderer"
import { typeEnum } from "./components/typeMaps"

const Editor = ({ children }) => {
	const ref = React.useRef(null)

	const nodes = React.useMemo(() => {
		return Nodes.parseReact(children).map(each => {
			switch (each.type) {
			case typeEnum.h1:
			case typeEnum.h2:
			case typeEnum.h3:
			case typeEnum.h4:
			case typeEnum.h5:
			case typeEnum.h6:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.p:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.hr:
				// No-op
				break
			default:
				throw new Error("FIXME: unknown type")
			}
			return each
		})
	}, [children])

	React.useLayoutEffect(React.useCallback(() => {
		// // Eagerly remove range because of performance:
		// //
		// // https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
		// const selection = document.getSelection()
		// if (selection && selection.rangeCount) {
		// 	selection.removeAllRanges()
		// }
		ReactDOM.render(<ReactRenderer>{nodes}</ReactRenderer>, ref.current, () => {
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
	}, [nodes]))

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
				{JSON.stringify(nodes, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
