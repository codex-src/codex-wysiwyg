import * as handlers from "lib/x/handlers"
import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import Highlight from "lib/PrismJS/Highlight"
import keyCodeFor from "lib/Client/keyCodeFor"
import React from "react"
import Releases from "./Releases"
import Transition from "lib/x/Transition"
import Wrap from "lib/x/Wrap"

import { // Unsorted
	resolveGFM,
	resolveHTML,
} from "./resolvers"

import { // Unsorted
	ReadWriteEditor,
	useEditorFromMarkup,
} from "Editor"

const Output = ({ output, setOutput }) => {
	const debouncedElements = React.useContext(ElementsContext)

	const [resolved, setResolved] = React.useState(() => {
		const gfm = resolveGFM(debouncedElements)
		const html = resolveHTML(debouncedElements)
		return { gfm, html }
	})

	React.useEffect(() => {
		if (output.detail === "gfm") {
			const result = resolveGFM(debouncedElements)
			setResolved(current => ({
				...current,
				gfm: result,
			}))
		}
	}, [debouncedElements, output.detail])

	React.useEffect(() => {
		if (output.detail === "html") {
			const result = resolveHTML(debouncedElements)
			setResolved(current => ({
				...current,
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
			<div className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
				{output.detail === "changelog" ? (
					<Releases />
				) : (
					<Wrap className={output.detail === "html" && "prism-custom-theme"}>
						<div className="p-6">
							<span className="inline-block">
								<Highlight
									className="whitespace-pre-wrap break-words font-mono text-gray-800"
									style={{
										MozTabSize: 2,
										tabSize: 2,
										fontSize: "0.8125rem",
									}}
									extension={output.detail}
								>
									{resolved[output.detail]}
								</Highlight>
							</span>
						</div>
					</Wrap>
				)}
			</div>
		</Transition>
	)
}

const FixedPreferences = React.memo(() => {

	const [output, setOutput] = React.useState({
		read: false,
		show: false,
		detail: "changelog",
	})

	const handleClickChangelog = e => {
		setOutput(current => ({
			read: true,
			show: !current.show || current.detail !== "changelog",
			detail: "changelog",
		}))
	}

	const handleClickGFM = e => {
		setOutput(current => ({
			...current,
			show: !current.show || current.detail !== "gfm",
			detail: "gfm",
		}))
	}

	const handleClickHTML = e => {
		setOutput(current => ({
			...current,
			show: !current.show || current.detail !== "html",
			detail: "html",
		}))
	}

	// // Binds the next pointerdown event to hide output.
	// handlers.usePointerdown(output.show && (e => {
	// 	if (!outputRef.current.contains(e.target) && !e.target.closest("button")) {
	// 		setOutput(current => ({
	// 			...current,
	// 			show: !current.show,
	// 		}))
	// 	}
	// }))

	// Binds the next keydown event to hide output.
	handlers.useKeydown(e => {
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

				{/* Changelog */}
				<div className="group relative">
					<Transition
						on={output.read}
						className="transition duration-500 ease-in-out"
						from="opacity-100 transform scale-100"
						to="opacity-0 transform scale-0"
					>
						<div className="mr-2 mt-1.5 absolute top-0 right-0">
							<div className="box-content w-1.5 h-1.5 bg-red-600 border-2 border-white group-hover:border-gray-100 rounded-full transition duration-200 ease-in-out" />
						</div>
					</Transition>
					<button
						className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "changelog" && "var(--gray-800)" }}
						onClick={handleClickChangelog}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
						</svg>
					</button>
				</div>

				{/* GFM */}
				<button
					className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "gfm" && "var(--gray-800)" }}
					onClick={handleClickGFM}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</button>

				{/* HTML */}
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
				output={output}
				setOutput={setOutput}
			/>
		</div>
	)
})

const ElementsContext = React.createContext(null)

const markup = `
<p>
	This prototype currently supports <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements. Of course, elements can be <strong><em>nested</em></strong> if that’s your thing.
</p>
<p>
	<br />
</p>
<p>
	Shortcuts are supported! You can use <code>${ctrlOrCmd}-i</code> for <em>italics</em>, <code>${ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-${ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-${ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>${ctrlOrCmd}-k</code> for <a href="TODO">links</a>. Finally, you can use <code>shift-${ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
</p>
<p>
	<br />
</p>
<p>
	<strong>Please note that many basic features are not yet implemented!</strong> 😎
</p>
`

const App = () => {
	const [state, dispatch] = useEditorFromMarkup(markup)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 16.67)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	return (
		<div className="px-6 py-32 flex flex-row justify-center">
			<div className="w-full max-w-2xl">

				<ElementsContext.Provider value={debouncedElements}>
					<FixedPreferences />
				</ElementsContext.Provider>

				<ReadWriteEditor
					className="text-lg text-gray-800"
					state={state}
					dispatch={dispatch}
				/>

				{/* {process.env.NODE_ENV !== "production" && ( */}
				{/* 	<div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}> */}
				{/* 		{JSON.stringify(state, null, "\t")} */}
				{/* 	</div> */}
				{/* )} */}

			</div>
		</div>
	)
}

export default App
