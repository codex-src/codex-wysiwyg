// import Editor from "Editor/Editor"
import React from "react"
import toHTML from "./toHTML"

const raw = `
<p>
	Hello, <a><code><strike><strong><em>world</em></strong></strike></code></a>
</p>
<p>
	Hello, <code><strike><strong><em>world</em></strong></strike></code>
</p>
<p>
	Hello, <strike><strong><em>world</em></strong></strike>
</p>
<p>
	Hello, <strong><em>world</em></strong>
</p>
<p>
	Hello, <em>world</em>
</p>
<p>
	Hello, world
</p>
`

console.log(toHTML(raw).outerHTML)

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			Hello, world!
		</div>
	</div>
)

export default App
