import React from "react"
import * as RTE from "./RichTextEditor"

const markup = `
<h1>
	Hello, world!
</h1>
<p>
	<br>
</p>
<p>
	So what’s the deal with WYSIWYG editors — are they a good or bad idea?\u0020
	In my opinion, what WYSIWYG editors got right was the editing interface, that is, a dead-simple approach to text-editing.\u0020
	But what did WYSIWYG editors <em>get wrong</em>?\u0020
	That’s the million-dollar question.\u0020
	🤑
</p>
<p>
	<br>
</p>
<p>
	What I love about WYSIWYG editors is that they’re designed for everyday people; <em>you don’t have to be developer to use them</em>.\u0020
	But what I love about markdown-based editors is how accurate formatting feels.\u0020
	When I type <code>_</code>, I <em>know</em> that the next character I type belongs to an <code>&lt;em&gt;</code> tag.\u0020
	So what I want is a WYSIWYG editor that feels as predictable as markdown.
</p>
<p>
	<br>
</p>
<p>
	When I started <a href="TODO">publishing on Medium</a>, it changed my life.\u0020
	I wanted to write more, but I couldn’t shake the feeling that the articles I was publishing weren’t mine.\u0020
	That is, why isn’t easier for me — the author — to get at my own data?\u0020
	Why can’t I download or upload articles as HTML or GitHub-Flavored Markdown?\u0020
	Why can’t the editor <em>just</em> be an editing interface and not a proprietary product?
</p>
<p>
	<br>
</p>
<p>
	These are some of the problems I want to solve with Codex:
</p>
<p>
	<br>
</p>
<p>
	• \u0020Predictable formatting; markdown doubles as shortcut macros
</p>
<p>
	• \u0020Resolve to HTML or GitHub-Flavored Markdown in realtime
</p>
<p>
	• \u0020VSCode extension or Electron app
</p>
<p>
	• \u0020Hosted service and API
<p>
	• \u0020Personal note-taking, publishing, cross-posting
</p>
`

// const children = <React.Fragment>
// 	<p>
// 		<code>Go</code> is <strong>expressive, concise, clean, and efficient</strong>.\u0020
// 		Its <a href="https://google.com">concurrency mechanisms</a> make it easy to write programs that get the most out of <code>multicore and networked machines</code>, while its novel type system enables <em>flexible and modular</em> program construction.
// 	</p>
// 	<p>
// 		<br />
// 	</p>
// 	<p>
// 		Go compiles quickly to machine code yet has the convenience of <strike>garbage</strike> collection and the power of run-time reflection.\u0020
// 		It's a fast, statically typed, <em>compiled language</em> that feels like a <em>dynamically typed, interpreted language</em>.
// 	</p>
// </React.Fragment>

// Trims whitespace; className={`\n...\n`} -> "...".
function classString(str) {
	return str.split(/\s+/g).filter(Boolean).join(" ")
}

const App = () => {
	// const [state, dispatch] = RTE.useRichTextEditorFromChildren(children.props.children)
	const [state, dispatch] = RTE.useRichTextEditorFromMarkup(markup)
	return (
		<div className="px-6 py-24 flex flex-row justify-center">
			<div className="w-full max-w-2xl">

				<div className={`
					text-xl
					text-gray-800
					subpixel-antialiased
				`}>
					<RTE.RichTextEditor
						state={state}
						dispatch={dispatch}
					/>
				</div>

			</div>
		</div>
	)
}

export default App
