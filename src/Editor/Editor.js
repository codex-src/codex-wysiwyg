import classNameString from "lib/classNameString"
import React from "react"
import typeMap from "./typeMap"
import useEditor from "./useEditor"

const Editor = ({ markup, children }) => {

	// Reference for the container <article> element.
	const articleRef = React.useRef(null)

	// Tracks whether the "pointerdown" event is active.
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor({ markup, children })

	return (
		<div>

			<article
				ref={articleRef}

				className={classNameString(`
					em-context
					subpixel-antialiased
					focus:outline-none
				`)}

				onPointerDown={e => {
					pointerdownRef.current = true
				}}

				onPointerMove={e => {
					if (!pointerdownRef.current) {
						// No-op
						return
					}
					// const cursors = Cursors.computeFromCurrentRange(articleRef.current)
					// if (!cursors) {
					// 	// No-op
					// 	return
					// }
					// dispatch.select(cursors)
				}}

				onPointerUp={e => {
					// pointerdownRef.current = false
				}}

				// TODO: Add COMPAT guard for select-all or prevent
				// default?
				onSelect={e => {
					// const cursors = Cursors.computeFromCurrentRange(ref.current)
					// if (!cursors) {
					// 	// No-op
					// 	return
					// }
					// dispatch.select(cursors)
				}}

				onKeyDown={e => {
					// ...
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
			>
				{state.elements.map(({ type: T, key, props }) => (
					React.createElement(typeMap[T], {
						key,
						id: key,
						...props,
					})
				))}
			</article>

			{/* Debugger */}
			<div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}>
				{JSON.stringify(state, null, "\t")}
			</div>

		</div>
	)
}

export default Editor
