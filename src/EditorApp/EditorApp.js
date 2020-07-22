// import useClickAwayCallback from "lib/x/useClickAwayCallback"
import DebugCSS from "lib/x/DebugCSS"
import Highlight from "lib/PrismJS/Highlight"
import React from "react"
import Transition from "lib/x/Transition"
import useKeyDownEscapeCallback from "lib/x/useKeyDownEscapeCallback"
import userAgent from "lib/Client/userAgent"

import { // Unsorted
	resolveGFM,
	resolveHTML,
} from "./resolvers"

import { // Unsorted
	Editor,
	ReadOnlyEditor,
	useEditorFromChildren,
} from "Editor"

const ctrlOrCmd = !userAgent.MacOSX ? "ctrl" : "cmd"

const doc = <React.Fragment>

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
		Open source: <a href="github.com/codex-src/codex-wysiwyg">https://github.com/codex-src/codex-wysiwyg</a> 🐙
	</p>
	<p>
		<br />
	</p>
	<p>
		<br />
	</p>
	<p>
		<strong>v0.2: July 21, 2020</strong>
	</p>
	<p>
		<br />
	</p>
	<p>
		– Added basic support for resolving to plaintext, GitHub-Flavored Markdown, and HTML.
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
		<em>*Note that formatting without a selection is not yet supported.</em>
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

const classNameMap = {
	gfm: "",
	html: "prism-custom-theme",
}

const Output = React.forwardRef(({ output, setOutput }, forwardedRef) => {
	const debouncedElements = React.useContext(ElementsContext)

	const [resolved, setResolved] = React.useState({
		gfm: "",
		html: "",
	})

	React.useEffect(() => {
		if (output.detail === "gfm") {
			const result = resolveGFM(debouncedElements)
			setResolved(resolved => ({
				...resolved,
				gfm: result,
			}))
		} else if (output.detail === "html") {
			const result = resolveHTML(debouncedElements)
			setResolved(resolved => ({
				...resolved,
				html: result,
			}))
		}
	}, [debouncedElements, output.detail])

	return (
		<Transition
			on={output.show}
			from="transition duration-200 ease-in opacity-0 transform translate-x-8 pointer-events-none"
			to="transition duration-200 ease-out opacity-100 transform translate-x-0 pointer-events-auto"
		>
			<div ref={forwardedRef} className="p-6 w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
				{output.detail === "changelog" ? (
					<ReadOnlyEditor>
						{doc.props.children}
					</ReadOnlyEditor>
				) : (
					<span className="inline-block">
						{/* NOTE: Do not use gray for text. */}
						<pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-800 subpixel-antialiased" style={{ MozTabSize: 2, tabSize: 2, /* fontSize: "0.6875rem" */ lineHeight: 1.4375 }}>
							<Highlight className={classNameMap[output.detail]} extension={output.detail}>
								{resolved[output.detail]}
							</Highlight>
						</pre>
					</span>
				)}
			</div>
		</Transition>
	)
})

const FixedPreferences = ({ state, dispatch }) => {
	const outputRef = React.useRef()

	const [output, setOutput] = React.useState({
		show: false,
		detail: "changelog",
	})

	const handleClickChangelog = e => {
		setOutput({
			show: !output.show || output.detail !== "changelog",
			detail: "changelog",
		})
	}
	const handleClickGFM = e => {
		setOutput({
			show: !output.show || output.detail !== "gfm",
			detail: "gfm",
		})
	}
	const handleClickHTML = e => {
		setOutput({
			show: !output.show || output.detail !== "html",
			detail: "html",
		})
	}

	// // Hides on click-away.
	// useClickAwayCallback(outputRef, () => {
	// 	if (output.show) {
	// 		setOutput({
	// 			...output,
	// 			show: false,
	// 		})
	// 	}
	// })

	// Hides on escape.
	useKeyDownEscapeCallback(outputRef, () => {
		// if (output.show) {
		setOutput({
			...output,
			show: !output.show,
		})
		// }
	})

	// NOTE: Uses flex flex-col ... self-start / self-end.
	return (
		<div className="px-3 pb-4 fixed inset-0 flex flex-col items-end pointer-events-none">
			<div className="py-2 flex flex-row justify-between">

				<button
					className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "changelog" && "var(--blue-600)" }}
					onClick={handleClickChangelog}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						{/* <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" fillRule="evenodd" /> */}
						<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
					</svg>
				</button>

				<button
					className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "gfm" && "var(--blue-600)" }}
					onClick={handleClickGFM}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</button>

				<button
					className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "html" && "var(--blue-600)" }}
					onClick={handleClickHTML}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</button>

			</div>
			<Output
				ref={outputRef}
				output={output}
				setOutput={setOutput}
			/>
		</div>
	)
}

const ElementsContext = React.createContext(null)

const App = () => {
	const [state, dispatch] = useEditorFromChildren(doc.props.children)
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
