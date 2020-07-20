// import tmpl from "lib/x/tmpl"
import * as RTE from "./RichTextEditor"
import React from "react"
import userAgent from "lib/Client/userAgent"

const ctrlOrCmd = !userAgent.MacOSX ? "ctrl" : "cmd"

const children = <React.Fragment>
	<h2>
		What I would love is a WYSIWYG editor that has predictable markdown shortcuts and can resolve to HTML and <a href="https://guides.github.com/features/mastering-markdown">GitHub-Flavored Markdown</a> in realtime.
	</h2>
	<p>
		<br />
	</p>
	<p>
		<strong>Introducing Codex 🎉🥳 — a next-generation WYSIWYG editor that responds to markdown and resolves to HTML or GitHub-Flavored Markdown.</strong>
	</p>
	<p>
		<br />
	</p>
	<p>
		<strong>🚧 Note this is an alpha; many features are not <em>yet</em> implemented!</strong>{" "}
		🚧
	</p>
	<p>
		<br />
	</p>
	<p>
		Me: <a href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</a> 🐦
	</p>
	<p>
		GitHub repo: <a href="github.com/codex-src/codex-wysiwyg">https://github.com/codex-src/codex-wysiwyg</a> 🐙
	</p>
	<p>
		<br />
	</p>
	<p>
		<br />
	</p>
	<p>
		<strong>v0.1: July 20, 2020</strong>
	</p>
	<p>
		<br />
	</p>
	<p>
		– Added complete support for all backspace operations, such as <code>"backspace-rune"</code>, <code>"backspace-word"</code>, and <code>"backspace-line"</code>.
	</p>
	<p>
		<br />
	</p>
	<p>
		– Added basic support for <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="https://google.com">link</a> for elements.{" "}
		Of course, elements can be <em><strong>nested</strong></em> if that’s your thing.
	</p>
	<p>
		<br />
	</p>
	<p>
		– Added basic support for shortcuts.{" "}
		You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <em>bold</em>, <code>shift-{ctrlOrCmd}-c</code> for <em>code</em>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="https://google.com">links</a>.{" "}
		Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
	</p>
	<p>
		<br />
	</p>
	<p>
		<em>*Note that formatting shortcuts without a selection are not yet supported.</em>
	</p>

	{/* <p> */}
	{/* 	<br /> */}
	{/* </p> */}
	{/* <p> */}
	{/* 	What’s really cool is you can also use GitHub-Flavored Markdown syntax as formatting macros.{" "} */}
	{/* 	✨{" "} */}
	{/* 	What does that mean? Instead of <code>{ctrlOrCmd}-i</code>, you can also type <code>`emphasized text`</code> to emphasize text with <em>italics</em>. */}
	{/* </p> */}

	{/* <p> */}
	{/* 	Here’s what I want to build: a desktop app for editing local files.{" "} */}
	{/* 	A hosted web-app for editing files in cloud.{" "} */}
	{/* 	And a Google Chrome extension for using the Codex editor in-place of other editor, such as for comments on GitHub. */}
	{/* </p> */}

	{/* <p> */}
	{/* 	<br /> */}
	{/* </p> */}
	{/* <p> */}
	{/* 	These are some of the problems I want to solve with Codex: */}
	{/* </p> */}
	{/* <p> */}
	{/* 	<br /> */}
	{/* </p> */}
	{/* <p> */}
	{/* 	• {" "}Predictable formatting; markdown doubles as shortcut macros */}
	{/* </p> */}
	{/* <p> */}
	{/* 	• {" "}Resolve to HTML or GitHub-Flavored Markdown in realtime */}
	{/* </p> */}
	{/* <p> */}
	{/* 	• {" "}VSCode extension or Electron app */}
	{/* </p> */}
	{/* <p> */}
	{/* 	• {" "}Hosted service and API */}
	{/* <p> */}
	{/* 	• {" "}Personal note-taking, publishing, cross-posting */}
	{/* </p> */}
</React.Fragment>

const App = () => {
	const [state, dispatch] = RTE.useRichTextEditorFromChildren(children.props.children)
	// const [state, dispatch] = RTE.useRichTextEditorFromMarkup(markup)
	return (
		<div className="px-6 py-24 flex flex-row justify-center">
			<div className="w-full max-w-2xl">

				{/* <div className="text-lg text-gray-800 subpixel-antialiased"> */}
				<RTE.RichTextEditor
					state={state}
					dispatch={dispatch}
				/>
				{/* </div> */}

			</div>
		</div>
	)
}

export default App
