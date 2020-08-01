import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import DebouncedElementsContext from "./DebouncedElementsContext"
import DispatchContext from "./DispatchContext"
import MemoFixedBottomWYSIWYGMenu from "./MemoFixedBottomWYSIWYGMenu"
import MemoFixedTopPreferences from "./MemoFixedTopPreferences"
import React from "react"

import { // Unsorted
	Editor,
	useEditor,
} from "Editor"

const App = () => {
	const [state, dispatch] = useEditor()

	// TODO: Change to state.readOnlyMode?
	const [readOnlyMode, setReadOnlyMode] = React.useState(false)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 30)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	return (
		<DebouncedElementsContext.Provider value={debouncedElements}>
			<DispatchContext.Provider value={dispatch}>

				<div className="px-6 py-32 flex flex-row justify-center h-full">
					<div className="w-full max-w-2xl h-full">

						<MemoFixedTopPreferences
							readOnlyMode={readOnlyMode}
							setReadOnlyMode={setReadOnlyMode}
						/>

						<div className="relative h-full">
							{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
								<div className="absolute pointer-events-none">
									<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
										A long time ago in a galaxy far, far away…
									</p>
								</div>
							)}
							<Editor
								id="main-editor"
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

						<MemoFixedBottomWYSIWYGMenu
							readOnlyMode={readOnlyMode}
							rangeTypes={state.rangeTypes}
						/>

					</div>
				</div>

			</DispatchContext.Provider>
		</DebouncedElementsContext.Provider>
	)
}

export default App
