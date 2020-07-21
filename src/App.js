// import tmpl from "lib/x/tmpl"
import * as RTE from "./RichTextEditor"
import DebugCSS from "lib/x/DebugCSS"
import React from "react"
import SyntaxHighlighting from "lib/PrismJS/SyntaxHighlighting"
import Transition from "lib/x/Transition"
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
		🚧 <strong>Note this is an alpha; many features are not <em>yet</em> implemented!</strong> 🚧
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

// <div className="ml-1.5 w-5 h-5 transform scale-90">
// 	<svg className="transform scale-105" fill="currentColor" viewBox="0 0 20 20">
// 		<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
// 	</svg>
// </div>

// const ConsoleButton = ({ show, setShow }) => (
// 	<>
// 		<button
// 			className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
// 			onPointerDown={e => e.preventDefault()}
// 			onClick={e => setShow(!show)}
// 		>
// 			<p className="font-semibold text-sm">
// 				Plaintext
// 			</p>
// 		</button>
// 		<button
// 			className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
// 			onPointerDown={e => e.preventDefault()}
// 			onClick={e => setShow(!show)}
// 		>
// 			<p className="font-semibold text-sm">
// 				Markdown
// 			</p>
// 		</button>
// 		<button
// 			className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
// 			onPointerDown={e => e.preventDefault()}
// 			onClick={e => setShow(!show)}
// 		>
// 			<p className="font-semibold text-sm">
// 				HTML
// 			</p>
// 		</button>
// 	</>
// )

function toHTML(elements) {
	let str = ""
	for (const each of elements) {
		// const str = (element => `<p>\n\t${toInnerString(element.children, cmapHTML)}\n</p>`)(each)
		// console.log(each)
		const reducer = (acc, each) => acc += each.props.children
		str += `<p id="${each.key}">\n\t${each.props.children.reduce(reducer, "") || "<br>"}\n</p>`
		if (each !== elements[elements.length - 1]) {
			str += "\n"
		}
	}
	return str
}

const Console = ({ extension, setExtension }) => {
	const debouncedElements = React.useContext(ElementsContext)

	const [results, setResults] = React.useState({
		plaintext: "",
		markdown: "",
		html: "",
	})

	React.useEffect(() => {
		if (extension !== "plaintext") {
			// No-op
			return
		}
		const html = toHTML(debouncedElements)
		setResults(results => ({
			...results,
			html,
		}))
	}, [
		debouncedElements,
		extension,
	])

	return (
		<Transition
			on={extension} // TODO
			from="transition duration-200 ease-in opacity-0 transform translate-x-8 pointer-events-none"
			to="transition duration-200 ease-out opacity-100 transform translate-x-0 pointer-events-auto"
		>
			<div className="p-6 w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
				<span className="inline-block">
					<pre className="font-mono text-xs leading-snug subpixel-antialiased" style={{ MozTabSize: 2, tabSize: 2 }}>
						<SyntaxHighlighting extension={extension}>
							{results[extension]}
							{/* {plaintext} */}
						</SyntaxHighlighting>
					</pre>
				</span>
			</div>
		</Transition>
	)
}

const FixedPreferences = ({ state, dispatch }) => {
	// const [show, setShow] = React.useState(false)
	const [extension, setExtension] = React.useState("")

	return (
		// NOTE: Uses flex flex-col because of max-h-full.
		<div className="px-3 pb-4 fixed inset-0 flex flex-col items-end pointer-events-none">
			<div className="py-2 flex flex-row justify-end">
				<button
					className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
					onPointerDown={e => e.preventDefault()}
					onClick={e => setExtension(extension !== "plaintext" ? "plaintext" : "")}
				>
					<p className="font-semibold text-sm">
						Plaintext
					</p>
				</button>
				<button
					className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
					onPointerDown={e => e.preventDefault()}
					onClick={e => setExtension(extension !== "gfm" ? "gfm" : "")}
				>
					<p className="font-semibold text-sm">
						Markdown
					</p>
				</button>
				<button
					className="px-2.5 py-1 flex flex-row items-center text-gray-800 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out pointer-events-auto"
					onPointerDown={e => e.preventDefault()}
					onClick={e => setExtension(extension !== "html" ? "html" : "")}
				>
					<p className="font-semibold text-sm">
						HTML
					</p>
				</button>
			</div>
			<Console
				extension={extension}
				setExtension={extension}
				// show={show}
				// setShow={setShow}
			/>
		</div>
	)
}

const ElementsContext = React.createContext(null)

const App = () => {
	const [state, dispatch] = RTE.useRichTextEditorFromChildren(children.props.children)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 250)
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
					<RTE.RichTextEditor
						state={state}
						dispatch={dispatch}
					/>
				</div>
			</div>
		</DebugCSS>
	)
}

export default App
