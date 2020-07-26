import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import DocumentTitle from "lib/x/DocumentTitle"
import MemoFixedPreferences from "./MemoFixedPreferences"
import MemoFixedStatusText from "./MemoFixedStatusText"
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

// document.body.classList.add("debug-css")

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

	return (
		<FocusedContext.Provider value={debouncedFocused}>
			<ElementsContext.Provider value={debouncedElements}>
				<RangeContext.Provider value={state.range}>

					<DocumentTitle title="Codex (0.5)">
						<div className="px-6 py-32 flex flex-row justify-center h-full">
							<div className="w-full max-w-2xl h-full">

								<MemoFixedPreferences />

								<div className="relative h-full">
									{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
										<div className="absolute pointer-events-none">
											<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
												Hello, world!
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

								<MemoFixedStatusText />

							</div>
						</div>
					</DocumentTitle>

				</RangeContext.Provider>
			</ElementsContext.Provider>
		</FocusedContext.Provider>
	)
}

export default App
