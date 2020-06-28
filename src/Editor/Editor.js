import classNameString from "lib/classNameString"
import hash from "lib/hash"
import React from "react"
import typeMap from "./typeMap"
import types from "./types"
import useEditor from "./useEditor"

// const raw = `
// <p>
// 	Hello, <a><code><strike><strong><em>world</em></strong></strike></code></a>!
// </p>
// <p>
// 	Hello, <code><strike><strong><em>world</em></strong></strike></code>!
// </p>
// <p>
// 	Hello, <strike><strong><em>world</em></strong></strike>!
// </p>
// <p>
// 	Hello, <strong><em>world</em></strong>!
// </p>
// <p>
// 	Hello, <em>world</em>!
// </p>
// <p>
// 	Hello, world!
// </p>
// `

// console.log(toHTML(raw).outerHTML)

// Hello, <a><code><strike><strong><em>world</em></strong></strike></code></a>!
const elements = [
	{
		type: types.p,
		key: hash(8),
		props: {
			spans: [
				{
					types: [],
					text: "Hello, ",
				},
				{
					types: [
						types.a,
						types.code,
						// types.strike,
						types.strong,
						types.em,
					],
					[types.a]: {
						href: "https://google.com",
					},
					text: "worldx",
				},
				{
					types: [
						types.a,
						types.code,
						// types.strike,
						types.strong,
						types.em,
					],
					[types.a]: {
						href: "https://google.com",
					},
					text: "worldy",
				},
				{
					types: [],
					text: "!",
				},
			],
		},
	},
	{
		type: types.p,
		key: hash(8),
		props: {
			spans: [
				{
					types: [],
					text: "Hello, ",
				},
				{
					types: [
						types.a,
						types.code,
						// types.strike,
						types.strong,
						types.em,
					],
					[types.a]: {
						href: "https://google.com",
					},
					text: "worldx",
				},
				{
					types: [
						types.a,
						types.code,
						// types.strike,
						types.strong,
						types.em,
					],
					[types.a]: {
						href: "https://google.com",
					},
					text: "worldy",
				},
				{
					types: [],
					text: "!",
				},
			],
		},
	},
]

// console.log(JSON.stringify(toTree(elements[0].props.spans), null, "\t"))

const Editor = ({ rawHTML }) => {
	// Reference for the container <article> element.
	const articleRef = React.useRef(null)

	// Tracks whether the "pointerdown" event is active.
	const pointerdownRef = React.useRef(false)

	const [state, dispatch] = useEditor(rawHTML)

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

				data-root
			>
				{elements.map(({ type, key, props }) => (
					React.createElement(typeMap[type], {
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
