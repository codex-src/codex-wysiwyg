import Editor from "./Editor/Editor"
import React from "react"

// const markup = `
// <p>
// 	Hello, <a href="https://google.com"><code><strike><strong><em>world</em></strong></strike></code></a>!
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

// eslint-disable jsx-a11y/anchor-is-valid
const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<Editor /* markup={markup} */>
				<p>
					Hello, <a href="https://google.com"><code><strike><strong><em>world</em></strong></strike></code></a>!
				</p>
				<p>
					Hello, <code><strike><strong><em>world</em></strong></strike></code>!
				</p>
				<p>
					Hello, <strike><strong><em>world</em></strong></strike>!
				</p>
				<p>
					Hello, <strong><em>world</em></strong>!
				</p>
				<p>
					Hello, <em>world</em>!
				</p>
				<p>
					Hello, world!
				</p>
			</Editor>
		</div>
	</div>
)

export default App
