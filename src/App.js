import Editor from "./Editor/Editor"
import React from "react"

const markup = `<p>
	Hello, <a href="https://google.com"><code><strong><em>world</em></strong></code></a>! How are <em>you</em> doing today?
</p>`

// <p>
// 	Hello, <code><strong><em>world</em></strong></code>!
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
// <p>
// 	<br>
// </p>
// <p>
// 	Hello, <a href="a"><code><strong><em>worldx</em></strong></code></a><a href="b"><code><strong><em>worldy</em></strong></code></a>!
// </p>
// `

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<Editor markup={markup}>
				{/* <p> */}
				{/* 	Hello, <a href="https://google.com"><code><strong><em>world</em></strong></code></a>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <code><strong><em>world</em></strong></code>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <strong><em>world</em></strong>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <em>world</em>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, world! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	<br /> */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <a href="a"><code><strong><em>worldx</em></strong></code></a><a href="b"><code><strong><em>worldy</em></strong></code></a>! */}
				{/* </p> */}
			</Editor>
		</div>
	</div>
)

export default App
