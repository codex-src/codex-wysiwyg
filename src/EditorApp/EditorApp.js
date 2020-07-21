import DebugCSS from "lib/x/DebugCSS"
import React from "react"
import SyntaxHighlighting from "lib/PrismJS/SyntaxHighlighting"
import tmpl from "lib/x/tmpl"
import Transition from "lib/x/Transition"
import userAgent from "lib/Client/userAgent"

import { // Unsorted
	resolvePlaintext,
	resolveMarkdown,
	resolveHTML,
} from "./resolvers"

import {
	Editor,
	useEditorFromChildren,
} from "Editor"

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
		🚧 <strong>Note this is an alpha; many features are not <em>yet</em> implemented!</strong> 🚧
	</p>
	<p>
		<br />
	</p>
	<p>
		Me: <a href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</a> 🐦
	</p>
	<p>
		GitHub: <a href="github.com/codex-src/codex-wysiwyg">https://github.com/codex-src/codex-wysiwyg</a> 🐙
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
		– Added basic support for <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="https://google.com">link</a> for elements. Of course, elements can be <em><strong>nested</strong></em> if that’s your thing.
	</p>
	<p>
		<br />
	</p>
	<p>
		– Added basic support for shortcuts. You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <em>bold</em>, <code>shift-{ctrlOrCmd}-c</code> for <em>code</em>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="https://google.com">links</a>. Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
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

</React.Fragment>

const Console = ({ output, setOutput }) => {
	const debouncedElements = React.useContext(ElementsContext)

	const [results, setResults] = React.useState({
		plaintext: "",
		markdown: "",
		html: "",
	})

	React.useEffect(() => {
		// Plaintext:
		if (output.extension === "plaintext") {
			const result = resolvePlaintext(debouncedElements)
			setResults(results => ({
				...results,
				plaintext: result,
			}))
		// GitHub-Flavored Markdown:
		} else if (output.extension === "markdown") {
			const result = resolveMarkdown(debouncedElements)
			setResults(results => ({
				...results,
				markdown: result,
			}))
		// HTML
		} else if (output.extension === "html") {
			const result = resolveHTML(debouncedElements)
			setResults(results => ({
				...results,
				html: result,
			}))
		}
	}, [debouncedElements, output.extension])

	return (
		<Transition
			on={output.show}
			from="transition duration-200 ease-in opacity-0 transform translate-x-8 pointer-events-none"
			to="transition duration-200 ease-out opacity-100 transform translate-x-0 pointer-events-auto"
		>
			<div className="p-6 w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
				<span className="inline-block">
					<pre className="whitespace-pre-wrap text-xs leading-snug font-mono subpixel-antialiased" style={{ MozTabSize: 2, tabSize: 2 }}>
						<SyntaxHighlighting extension={output.extension}>
							{results[output.extension]}
						</SyntaxHighlighting>
					</pre>
				</span>
			</div>
		</Transition>
	)
}

const FixedPreferences = ({ state, dispatch }) => {
	const [output, setOutput] = React.useState({
		show: false,
		extension: "plaintext",
	})

	// Click-handler for plaintext.
	const handleClickPlaintext = e => {
		setOutput({
			show: !output.show || output.extension !== "plaintext",
			extension: "plaintext",
		})
	}

	// Click-handler for GitHub-Flavored Markdown.
	const handleClickMarkdown = e => {
		setOutput({
			show: !output.show || output.extension !== "markdown",
			extension: "markdown",
		})
	}

	// Click-handler for HTML.
	const handleClickHTML = e => {
		setOutput({
			show: !output.show || output.extension !== "html",
			extension: "html",
		})
	}

	return (
		// NOTE: Uses flex flex-col because of max-h-full.
		<div className="px-3 pb-4 fixed inset-0 flex flex-col items-end pointer-events-none">
			<div className="py-2 flex flex-row justify-end">
				{(buttonClassName => (
					<React.Fragment>
						<button
							className={buttonClassName}
							onClick={handleClickPlaintext}
						>
							<p className="font-semibold text-sm">
								Plaintext
							</p>
						</button>
						<button
							className={buttonClassName}
							onClick={handleClickMarkdown}
						>
							<p className="font-semibold text-sm">
								Markdown
							</p>
						</button>
						<button
							className={buttonClassName}
							onClick={handleClickHTML}
						>
							<p className="font-semibold text-sm">
								HTML
							</p>
						</button>
					</React.Fragment>
				))(tmpl`
					px-2.5 py-1
					flex flex-row items-center
					text-gray-800 focus:bg-gray-100
					rounded-full
					focus:outline-none
					transition duration-300 ease-in-out
					pointer-events-auto
				`)}
			</div>
			<Console
				output={output}
				setOutput={setOutput}
			/>
		</div>
	)
}

const ElementsContext = React.createContext(null)

const App = () => {
	const [state, dispatch] = useEditorFromChildren(children.props.children)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 100)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	return (
		<DebugCSS enabled={false /* process.env.NODE_ENV */}>
			<div className="px-6 py-32 flex flex-row justify-center">
				<div className="w-full max-w-2xl">
					<ElementsContext.Provider value={debouncedElements}>
						<FixedPreferences
							state={state}
							dispatch={dispatch}
						/>
					</ElementsContext.Provider>
					<Editor
						state={state}
						dispatch={dispatch}
					/>
				</div>
			</div>
		</DebugCSS>
	)
}

export default App
