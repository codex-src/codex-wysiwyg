// import Editor from "Editor/Editor"
// import toHTML from "./toHTML"
// import toTree from "./toTree"
import hash from "lib/hash"
import React from "react"
import typeMap from "./typeMap"
import types from "./types"

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
						href: "https://g\noogle.com",
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

const ReactRenderer = ({ elements }) => (
	elements.map(({ type, key, props }) => (
		React.createElement(typeMap[type], {
			// NOTE: Passes key as a prop (id).
			type,
			key,
			id: key,
			...props,
		})
	))
)

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<ReactRenderer elements={elements} />
		</div>
	</div>
)

export default App
