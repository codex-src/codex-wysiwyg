import * as handlers from "lib/x/handlers"
import content from "./content"
import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import DebugCSS from "lib/x/DebugCSS"
import Highlight from "lib/PrismJS/Highlight"
import keyCodeFor from "lib/Client/keyCodeFor"
import React from "react"
import tmpl from "lib/x/tmpl"
import Transition from "lib/x/Transition"

import { // Unsorted
	resolveGFM,
	resolveHTML,
} from "./resolvers"

import { // Unsorted
	Editor,
	ReadOnlyEditor,
	useEditorFromChildren,
} from "Editor"

const ReleaseItem = ({ date, release, children }) => (
	<div className="px-6 py-4">
		<div className="pb-2 flex flex-row justify-end">
			<div className="px-2.5 py-0.5 bg-green-100 rounded-full">
				<p className="font-medium text-xs leading-4 text-green-800">
					{date} &nbsp;– &nbsp;v{release}
				</p>
			</div>
		</div>
		<ReadOnlyEditor className="text-gray-800" style={{ fontSize: "0.9375rem" }}>
			{children}
		</ReadOnlyEditor>
	</div>
)

const Output = React.forwardRef(({ output, setOutput }, forwardedRef) => {
	const debouncedElements = React.useContext(ElementsContext)

	const [resolved, setResolved] = React.useState(() => {
		const gfm = resolveGFM(debouncedElements)
		const html = resolveHTML(debouncedElements)
		return { gfm, html }
	})

	React.useEffect(() => {
		if (output.detail === "gfm") {
			const result = resolveGFM(debouncedElements)
			setResolved(r => ({
				...r,
				gfm: result,
			}))
		}
	}, [debouncedElements, output.detail])

	React.useEffect(() => {
		if (output.detail === "html") {
			const result = resolveHTML(debouncedElements)
			setResolved(r => ({
				...r,
				html: result,
			}))
		}
	}, [debouncedElements, output.detail])

	return (
		<Transition
			on={output.show}
			from="transition duration-200 ease-in opacity-0 transform -translate-y-4 pointer-events-none"
			to="transition duration-200 ease-out opacity-100 transform translate-y-0 pointer-events-auto"
		>
			<div ref={forwardedRef} className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
				{output.detail === "changelog" ? (

					<React.Fragment>
						<ReleaseItem date="July 22, 2020" release="0.3">
							<p>
								– Added a dedicated changelog and improved readability for markdown and HTML-rendered code.
							</p>
						</ReleaseItem>
						<hr className="border-t border-gray-100" />
						<ReleaseItem date="July 21, 2020" release="0.2">
							<p>
								– Added basic support for resolving to plaintext, GitHub-Flavored Markdown, and HTML.
							</p>
						</ReleaseItem>
						<hr className="border-t border-gray-100" />
						<ReleaseItem date="July 20, 2020" release="0.1">
							<p>
								– Added complete support for all backspace operations, such as <code>"backspace-rune"</code>, <code>"backspace-word"</code>, and <code>"backspace-line"</code>.
							</p>
							<p>
								<br />
							</p>
							<p>
								– Added basic support for <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements.{" "}
								Of course, elements can be <em><strong>nested</strong></em> if that’s your thing.
							</p>
							<p>
								<br />
							</p>
							<p>
								– Added basic support for shortcuts.{" "}
								You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>.{" "}
								Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
							</p>
							<p>
								<br />
							</p>
							<p>
								*Note that formatting without a selection is not yet supported.
							</p>
						</ReleaseItem>
					</React.Fragment>

				) : (

					<div className="p-6">
						<span className="inline-block">
							<pre className="whitespace-pre-wrap break-words font-mono text-gray-800 subpixel-antialiased" style={{ MozTabSize: 2, tabSize: 2, fontSize: "0.8125rem", lineHeight: 1.4375 }}>
								<Highlight className={tmpl`${output.detail === "html" && "prism-custom-theme"}`} extension={output.detail}>
									{resolved[output.detail]}
								</Highlight>
							</pre>
						</span>
					</div>

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
		setOutput(current => ({
			show: !current.show || current.detail !== "changelog",
			detail: "changelog",
		}))
	}

	const handleClickGFM = e => {
		setOutput(current => ({
			show: !current.show || current.detail !== "gfm",
			detail: "gfm",
		}))
	}

	const handleClickHTML = e => {
		setOutput(current => ({
			show: !current.show || current.detail !== "html",
			detail: "html",
		}))
	}

	handlers.usePointerDown(output.show && (e => {
		if (!e.target.closest("button")) {
			setOutput(current => ({
				...current,
				show: !current.show,
			}))
		}
	}))

	handlers.useKeyDown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			setOutput(current => ({
				...current,
				show: !current.show,
			}))
		}
	})

	// NOTE: Uses flex flex-col ... self-end.
	return (
		<div className="px-3 pb-4 fixed inset-0 flex flex-col items-end pointer-events-none">
			<div className="py-2 flex flex-row justify-between">

				<button
					className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "changelog" && "var(--gray-800)" }}
					onClick={handleClickChangelog}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
					</svg>
				</button>

				<button
					className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "gfm" && "var(--gray-800)" }}
					onClick={handleClickGFM}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</button>

				<button
					className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "html" && "var(--gray-800)" }}
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
	const [state, dispatch] = useEditorFromChildren(content)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 60)
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
						className="text-lg"
						state={state}
						dispatch={dispatch}
					/>
				</div>
			</div>
		</DebugCSS>
	)
}

export default App
