import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import Markdown from "./Markdown"
import MemoFixedPreferences from "./MemoFixedPreferences"
import React from "react"

import { // Unsorted
	FocusedContext,
	ElementsContext,
	RangeContext,
} from "./contexts"

import { // Unsorted
	Editor,
	useEditor,
} from "Editor"

import { // Unsorted
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "Editor/components/components-text"

const App = () => {
	const [state, dispatch] = useEditor()

	const [debouncedFocused, setDebouncedFocused] = React.useState(() => state.focused)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedFocused(state.focused)
		}, 100)
		return () => {
			clearTimeout(id)
		}
	}, [state.focused])

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 100)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	// document.body.classList.add("debug-css")

	return (
		<FocusedContext.Provider value={debouncedFocused}>
			<ElementsContext.Provider value={debouncedElements}>
				<RangeContext.Provider value={state.range}>

					<div className="px-6 py-32 flex flex-row justify-center h-full">
						<div className="w-full max-w-2xl h-full">

							<MemoFixedPreferences />

							<div className="relative h-full">
								{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
									<div className="absolute pointer-events-none">
										<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
											A long time ago in a galaxy far, far away…
										</p>
									</div>
								)}
								<Editor
									className="min-h-full text-lg text-gray-800"
									state={state}
									dispatch={dispatch}
								>
									<p>
										This prototype currently supports <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements.{" "}
										Of course, elements can be <strong><em>nested</em></strong> if that’s your thing.
									</p>
									<p>
										<br />
									</p>
									<p>
										Shortcuts are supported!{" "}
										You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>.{" "}
										Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
									</p>
									<p>
										<br />
									</p>
									<p>
										<strong>Please note that many basic features are not yet implemented!</strong> 😎
									</p>
								</Editor>
							</div>

							<div className="px-3 py-6 fixed inset-x-0 bottom-0 pointer-events-none">
								<div className="flex flex-row justify-center">
									<div className="pointer-events-auto">
										<div className="-mx-2 px-3 py-2 flex flex-row items-center bg-white rounded-lg shadow-hero">

											{/* <span class="token tag"> */}
											{/* 	<span class="token tag"> */}
											{/* 		<span class="token punctuation"> */}
											{/* 			&lt; */}
											{/* 		</span> */}
											{/* 		em */}
											{/* 	</span> */}
											{/* 	<span class="token punctuation"> */}
											{/* 		&gt; */}
											{/* 	</span> */}
											{/* </span> */}

											<button className="!mx-1 px-2 py-1 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out">
												<Em>
													Emphasis
												</Em>
											</button>
											<button className="!mx-1 px-2 py-1 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out">
												<Strong>
													Strong
												</Strong>
											</button>
											<button className="!mx-1 px-2 py-1 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out">
												<Code>
													Code
												</Code>
											</button>
											<button className="!mx-1 px-2 py-1 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out">
												<Strike>
													Strikethrough
												</Strike>
											</button>
											<button className="!mx-1 px-2 py-1 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out">
												<A>
													Link
												</A>
											</button>

										</div>
									</div>
								</div>
							</div>

							{/* <MemoFixedStatusText /> */}

						</div>
					</div>

				</RangeContext.Provider>
			</ElementsContext.Provider>
		</FocusedContext.Provider>
	)
}

export default App
